require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
	connectionTimeoutMillis: 10000,
});

// 新增這段測試邏輯
db.connect((err, client, release) => {
	if (err) {
		// 改成這樣，印出完整的 err 物件
		return console.error(
			"❌ 連接到 Neon 失敗，完整原因：",
			JSON.stringify(err, null, 2) || err.stack || err,
		);
	}
	console.log("✅ 成功連接到 Neon 資料庫！");
	release();
});

module.exports = db;
