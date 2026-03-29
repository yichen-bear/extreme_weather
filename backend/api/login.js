const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// 假設你已經寫好 db.js 來處理資料庫連線
const db = require('../db'); 

// 這裡的路徑會接在 index.js 設定的主路徑之後
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: '帳號或密碼錯誤' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ message: '帳號或密碼錯誤' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ message: '登入成功', token });
    } catch (err) {
        res.status(500).json({ message: '伺服器錯誤' });
    }
});

module.exports = router;