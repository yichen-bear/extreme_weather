const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
// 引入在 auth.js 寫好的驗證 Middleware
const { verifyToken } = require("./auth");

// 1. 更新基本資料 (玩家名稱與頭像)
// 路徑: PUT /api/user/profile
router.put("/profile", verifyToken, async (req, res) => {
	const { username, avatar } = req.body;
	const userId = req.user.userId; // 從 verifyToken 解析出來的 userId

	try {
		// 檢查是否有其他使用者已經用了這個 username (排除自己)
		const { rows: existingUser } = await db.query(
			"SELECT id FROM users WHERE username = $1 AND id != $2",
			[username, userId]
		);
		
		if (existingUser.length > 0) {
			return res.status(400).json({ message: "這個玩家名稱已經被別人使用了！" });
		}

		// 更新資料庫
		await db.query(
			"UPDATE users SET username = $1, avatar = $2 WHERE id = $3",
			[username, avatar, userId]
		);

		res.json({ message: "基本資料更新成功" });
	} catch (err) {
		console.error("更新基本資料錯誤:", err);
		res.status(500).json({ message: "伺服器錯誤" });
	}
});

// 2. 更新密碼
// 路徑: PUT /api/user/password
router.put("/password", verifyToken, async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const userId = req.user.userId;

	try {
		// 先從資料庫找出該使用者
		const { rows: users } = await db.query(
			"SELECT * FROM users WHERE id = $1",
			[userId]
		);

		if (users.length === 0) {
			return res.status(404).json({ message: "找不到該用戶" });
		}

		const user = users[0];

		// 防呆：如果是 Google 登入的帳號，密碼是 "GOOGLE_AUTH_EXTERNAL"，不允許在這裡改密碼
		if (user.password_hash === "GOOGLE_AUTH_EXTERNAL") {
			return res.status(400).json({ message: "Google 登入帳號無法修改密碼！" });
		}

		// 比對舊密碼是否正確
		const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
		if (!isMatch) {
			return res.status(400).json({ message: "舊密碼不正確！" });
		}

		// 將新密碼加密
		const hashedNewPassword = await bcrypt.hash(newPassword, 10);

		// 更新資料庫中的密碼
		await db.query(
			"UPDATE users SET password_hash = $1 WHERE id = $2",
			[hashedNewPassword, userId]
		);

		res.json({ message: "密碼更新成功" });
	} catch (err) {
		console.error("更新密碼錯誤:", err);
		res.status(500).json({ message: "伺服器錯誤" });
	}
});

module.exports = router;