const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. 檢查使用者或 Email 是否已存在
        const [existingUser] = await db.execute(
            'SELECT * FROM users WHERE email = ? OR username = ?', 
            [email, username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: '使用者名稱或 Email 已被註冊' });
        }

        // 2. 加密密碼 (Salt rounds 建議設為 10)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. 存入資料庫
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: '註冊成功', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '伺服器錯誤' });
    }
});

module.exports = router;