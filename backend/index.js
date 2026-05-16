require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const db = require('./db')

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    // 允許沒有 origin 的請求 (例如 Postman 測試或同源請求)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS 錯誤：此網域不允許連線！'));
    }
  },
  credentials: true // 如果未來有要傳送 Cookie 或 Auth Token，這行會很有用
}));

// 引入路由模組
const authRoute = require('./api/auth');
const allowedOrigins = [
  'http://localhost:5173',                         // 本地開發用
  'https://extreme-weather-1.onrender.com'           // 填入你剛拿到的 Render 前端網址 (記得結尾不要加 /)
];

// 掛載路徑
app.use('/api/auth', authRoute);
app.use('/api/score', require('./api/score')); // 引入並掛載分數相關的路由

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});