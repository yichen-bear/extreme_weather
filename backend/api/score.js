// backend/api/score.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");

// 驗證 JWT Token 的中間件 (Middleware)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 取得 Bearer TOKEN
    
    if (!token) return res.status(401).json({ message: "未授權，請先登入" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token 失效，請重新登入" });
        req.userId = user.userId; // 將解密出來的 userId 帶到下一個流程
        next();
    });
};

// 儲存關卡通過紀錄的 API 路由
// 完整路徑為: /api/score/update-level
router.post("/update-level", authenticateToken, async (req, res) => {
    const { levelColumn } = req.body;
    const userId = req.userId;

    // 白名單防禦線：防止惡意前端傳入奇怪的字串搞 SQL Injection
    const validColumns = ["levelnew", "levelflood", "levelfire", "levelwind", "levelfinal"];
    if (!validColumns.includes(levelColumn)) {
        return res.status(400).json({ message: "無效的關卡欄位名稱" });
    }

    try {
        // 使用動態字串安全地更新該關卡狀態為 1 (代表已通關)
        const queryText = `UPDATE users SET ${levelColumn} = 1 WHERE id = $1`;
        await db.query(queryText, [userId]);

        res.json({ 
            success: true, 
            message: `關卡 ${levelColumn} 紀錄更新成功！` 
        });
    } catch (err) {
        console.error("更新關卡資料庫錯誤:", err);
        res.status(500).json({ message: "伺服器資料庫錯誤" });
    }
});

module.exports = router;