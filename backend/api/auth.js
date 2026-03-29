const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// 註冊路徑: /api/auth/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [existingUser] = await db.execute(
            'SELECT * FROM users WHERE email = ? OR username = ?', 
            [email, username]
        );
        if (existingUser.length > 0) return res.status(400).json({ message: '重複註冊' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: '註冊成功' });
    } catch (err) {
        res.status(500).json({ message: '伺服器錯誤' });
    }
});

// 登入路徑: /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: '帳號或密碼錯誤' });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: '帳號或密碼錯誤' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: '登入成功', token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: '伺服器錯誤' });
    }
});

module.exports = router;