const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const { verifyToken } = require("./auth");

// 💡 引入 multer, path, fs
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 💡 確保後端有 uploads 資料夾，沒有的話自動建立
if (!fs.existsSync("uploads")) {
	fs.mkdirSync("uploads");
}

// 💡 設定 multer 儲存位置與檔名
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		// 給圖片一個不重複的檔名 (時間戳 + 原本的副檔名)
		cb(null, Date.now() + path.extname(file.originalname));
	}
});
const upload = multer({ storage: storage });


// 1. 更新基本資料 (改用 upload.single('avatarFile') 接收檔案)
router.put("/profile", verifyToken, upload.single("avatarFile"), async (req, res) => {
	const { username } = req.body;
	const userId = req.user.userId;

	try {
		const { rows: existingUser } = await db.query(
			"SELECT id FROM users WHERE username = $1 AND id != $2",
			[username, userId]
		);
		
		if (existingUser.length > 0) {
			return res.status(400).json({ message: "這個玩家名稱已經被別人使用了！" });
		}

		// 💡 處理圖片網址
		let avatarUrl = req.body.avatar; // 如果使用者沒換圖片，會傳舊的網址過來

		if (req.file) {
			// 如果有上傳新檔案，組合出新的圖片網址 (動態抓取目前的 host)
			const domain = req.protocol + "://" + req.get("host");
			avatarUrl = `${domain}/uploads/${req.file.filename}`;
		}

		// 更新資料庫
		await db.query(
			"UPDATE users SET username = $1, avatar = $2 WHERE id = $3",
			[username, avatarUrl, userId]
		);

		// 💡 把更新後的頭像網址回傳給前端
		res.json({ message: "基本資料更新成功", avatar: avatarUrl });
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