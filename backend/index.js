require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

// 引入路由模組
const authRoute = require('./api/auth');

// 掛載路徑
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});