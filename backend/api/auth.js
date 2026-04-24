const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 註冊路徑: /api/auth/register
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	const defaultAvatar = "/user.png";

	try {
		const [existingUser] = await db.execute(
			"SELECT * FROM users WHERE email = ? OR username = ?",
			[email, username],
		);
		if (existingUser.length > 0)
			return res.status(400).json({ message: "重複註冊" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const [result] = await db.execute(
			"INSERT INTO users (username, email, password_hash, avatar) VALUES (?, ?, ?, ?)",
			[username, email, hashedPassword, defaultAvatar],
		);

		res.status(201).json({ message: "註冊成功" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "伺服器錯誤" });
	}
});

// 登入路徑: /api/auth/login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
			email,
		]);
		if (users.length === 0)
			return res.status(401).json({ message: "帳號或密碼錯誤" });

		const user = users[0];
		const isMatch = await bcrypt.compare(password, user.password_hash);
		if (!isMatch) return res.status(401).json({ message: "帳號或密碼錯誤" });

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		res.json({ 
            message: "登入成功", 
            token, 
            username: user.username,
            avatar: user.avatar
        });
	} catch (err) {
		res.status(500).json({ message: "伺服器錯誤" });
	}
});

// Google 登入路徑: /api/auth/google
router.post("/google", async (req, res) => {
	const { idToken } = req.body;

	try {
		// 驗證 Google ID Token
		const ticket = await client.verifyIdToken({
			idToken: idToken,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		const { email, name, picture, sub: googleId } = payload; // sub 是 Google 的唯一 ID

		// 1. 檢查資料庫是否有此 Google 用戶或 Email
		let [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
			email,
		]);
		let user;

		if (users.length === 0) {
			// 2. 如果是第一次登入，自動註冊 (密碼隨機或為空，因為是第三方登入)
			await db.execute(
				"INSERT INTO users (username, email, password_hash, avatar) VALUES (?, ?, ?, ?)",
				[name, email, "GOOGLE_AUTH_EXTERNAL", picture],
			);
			const [newUsers] = await db.execute(
				"SELECT * FROM users WHERE email = ?",
				[email],
			);
			user = newUsers[0];
		} else {
			user = users[0];
			// 如果使用者換了 Google 大頭貼，可以順便更新資料庫
			await db.execute("UPDATE users SET avatar = ? WHERE id = ?", [
				picture,
				user.id,
			]);
		}

		// 3. 簽發你自己專案的 JWT (沿用你原本的邏輯)
		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		res.json({
			message: "Google 登入成功",
			token,
			username: user.username,
			avatar: picture, // 回傳圖片網址給前端
		});
	} catch (err) {
		console.error("Google Auth Error:", err);
		res.status(401).json({ message: "Google 驗證失效" });
	}
});

module.exports = router;
