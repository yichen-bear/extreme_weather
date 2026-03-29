require('dotenv').config();
const express = require('express');
const app = express();

// 引入路由模組
const loginRoute = require('./api/login');
const registerRoute = require('./api/register');

app.use(express.json());

// 掛載路徑
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});