require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 1. 先宣告允許的白名單（注意：結尾不要加斜線 /）
const allowedOrigins = [
	"http://localhost:5173", // 本地開發用
	"https://extreme-weather-red.vercel.app", // 你的 Vercel 前端正式網址
];

// 2. 再掛載 cors 中間件
app.use(
	cors({
		origin: function (origin, callback) {
			// 允許沒有 origin 的請求 (例如 Postman 測試或同源請求)
			if (!origin) return callback(null, true);

			if (
				origin &&
				allowedOrigins.map((o) => o.trim()).includes(origin.trim())
			) {
				callback(null, true);
			} else {
				// 這裡可以將 origin 印出來，方便在 Render 日誌查看是哪個網域被拒絕了
				console.log("被拒絕的來源網域 (Origin):", origin);
				callback(new Error("CORS 錯誤：此網域不允許連線！"));
			}
		},
		credentials: true, // 允許傳送 Cookie 或 Auth Token
	}),
);

// 引入路由模組
const { router: authRoute } = require("./api/auth");

// 掛載路徑
app.use("/api/auth", authRoute);
app.use("/api/score", require("./api/score")); // 引入並掛載分數相關的路由
app.use("/api/user", require("./api/user"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`伺服器運行在 http://localhost:${PORT}`);
});
