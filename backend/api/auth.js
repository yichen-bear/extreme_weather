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
        // 1. 檢查重複（PostgreSQL 使用 $1, $2）
        const { rows: existingUser } = await db.query(
            "SELECT * FROM users WHERE email = $1 OR username = $2",
            [email, username]
        );
        if (existingUser.length > 0)
            return res.status(400).json({ message: "重複註冊" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. 插入資料，包含你新增的 5 個關卡欄位，預設為 0
        // 注意：這裡共有 9 個欄位，所以要有 $1 到 $9
        await db.query(
            "INSERT INTO users (username, email, password_hash, avatar, levelnew, levelflood, levelfire, levelwind, levelfinal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [username, email, hashedPassword, defaultAvatar, false, false, false, false, false]
        );

        res.status(201).json({ message: "註冊成功" });
    } catch (err) {
        console.error("註冊詳細錯誤:", err); // 這行能在 Docker 日誌看到具體原因
        res.status(500).json({ message: "伺服器錯誤" });
    }
});

// 登入路徑: /api/auth/login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		// PostgreSQL 使用 $1，並從 rows 屬性獲取資料
		const { rows: users } = await db.query("SELECT * FROM users WHERE email = $1", [
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
            avatar: user.avatar,
            // 同時回傳關卡狀態供前端使用
            levelnew: user.levelnew,
            levelflood: user.levelflood,
            levelfire: user.levelfire,
            levelwind: user.levelwind,
            levelfinal: user.levelfinal
        });
	} catch (err) {
        console.error("登入錯誤:", err);
		res.status(500).json({ message: "伺服器錯誤" });
	}
});

// Google 登入路徑: /api/auth/google
router.post("/google", async (req, res) => {
	const { idToken } = req.body;

	try {
		const ticket = await client.verifyIdToken({
			idToken: idToken,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		const { email, name, picture } = payload; 

		// 1. 檢查資料庫是否有此 Google 用戶，同步更新為 PostgreSQL 語法
		let { rows: users } = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		let user;

		if (users.length === 0) {
			// 2. 自動註冊，並包含預設的關卡欄位
			await db.query(
				"INSERT INTO users (username, email, password_hash, avatar, levelnew, levelflood, levelfire, levelwind, levelfinal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
				[name, email, "GOOGLE_AUTH_EXTERNAL", picture, false, false, false, false, false],
			);
			const { rows: newUsers } = await db.query(
				"SELECT * FROM users WHERE email = $1",
				[email],
			);
			user = newUsers[0];
		} else {
			user = users[0];
			// 更新大頭貼
			await db.query("UPDATE users SET avatar = $1 WHERE id = $2", [
				picture,
				user.id,
			]);
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		res.json({
			message: "Google 登入成功",
			token,
			username: user.username,
			avatar: picture,
            levelnew: user.levelnew,
            levelflood: user.levelflood,
            levelfire: user.levelfire,
            levelwind: user.levelwind,
            levelfinal: user.levelfinal
		});
	} catch (err) {
		console.error("Google Auth Error:", err);
		res.status(401).json({ message: "Google 驗證失效" });
	}
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) return res.status(401).json({ message: "未授權" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token 失效" });
        req.userId = user.userId;
        next();
    });
};

// 儲存遊玩情況路徑: /api/user/update-level
router.post("/update-level", authenticateToken, async (req, res) => {
    const { levelColumn } = req.body;
    const userId = req.userId;

    // 白名單防禦線：防止惡意前端傳入奇怪的字串搞 SQL Injection
    const validColumns = ["levelnew", "levelflood", "levelfire", "levelwind", "levelfinal"];
    if (!validColumns.includes(levelColumn)) {
        return res.status(400).json({ message: "無效的關卡欄位" });
    }

    try {
        // 動態將對應欄位更新為 true
        const queryText = `UPDATE users SET ${levelColumn} = true WHERE id = $1`;
        await db.query(queryText, [userId]);

        res.json({ message: "關卡紀錄更新成功" });
    } catch (err) {
        console.error("更新關卡紀錄失敗:", err);
        res.status(500).json({ message: "伺服器錯誤" });
    }
});

module.exports = router;
