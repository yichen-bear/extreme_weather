require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
	// 1. 將等待時間拉長到 20 秒，留給 Neon 充足的喚醒（冷啟動）時間
	connectionTimeoutMillis: 20000,
	// 2. 當連線閒置超過 15 秒就自動釋放，避免舊的死連線佔用通道
	idleTimeoutMillis: 30000,
	// 3. 限制最大連線數（Neon 免費版連線數有限，Docker 頻繁重啟容易擠爆）
	max: 10, 
});

// 新增這段測試邏輯
db.connect((err, client, release) => {
	if (err) {
		console.error("❌ 連接到 Neon 失敗！");
		console.error("錯誤代碼 (Code):", err.code);
		console.error("完整原因：", JSON.stringify(err, null, 2) || err.stack || err);
		
		if (err.code === 'ETIMEOUT' || err.message.includes('timeout')) {
			console.error("💡 提示：這通常是 Neon 正在進行冷啟動（Cold Start）或自動縮放，請確認使用的是 Direct 連線字串。");
		}
		return;
	}
	console.log("✅ 成功連接到 Neon 資料庫！");
	release(); // 記得釋放連線回連接池
});

// 當 Pool 內部的連線發生非預期錯誤時的監聽
db.on('error', (err) => {
	console.error('🚨 連接池中的閒置連線發生非預期錯誤：', err);
});

module.exports = db;
