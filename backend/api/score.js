const express = require('express');
const router = express.Router();
const pool = require('../db'); // 確保路徑與你原本的一致

// 【修正重點 1】因為 auth.js 是匯出物件，這裡只保留解構賦值的寫法
const { verifyToken } = require('./auth'); 

// 更新通關紀錄或最高高度
router.post('/update-level', verifyToken, async (req, res) => {
  
  // 【修正重點 2】防呆機制：確保 token 解析成功且有 userId
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: '未授權或無法取得使用者資訊' });
  }

  const userId = req.user.userId;
  const { levelColumn, score, character } = req.body;

  // 白名單檢查，防止 SQL 注入
  const allowedColumns = ["levelnew", "levelflood", "levelfire", "levelwind", "levelfinal"];
  if (!allowedColumns.includes(levelColumn)) {
    return res.status(400).json({ message: '無效的欄位名稱' });
  }

  try {
    // 狀況 A：如果是最終試煉，要走「比較最高高度」的邏輯
    if (levelColumn === 'levelfinal') {
      if (score === undefined || !character) {
        return res.status(400).json({ message: '缺少高度或角色參數' });
      }

      // 【修正重點 3】確保 score 是數字型別，避免字串比較出錯
      const numericScore = Number(score);
      if (isNaN(numericScore)) {
        return res.status(400).json({ message: '分數格式錯誤' });
      }

      // 先查詢目前資料庫裡的最高高度
      const currentRes = await pool.query(
        `SELECT levelfinal FROM users WHERE id = $1`, 
        [userId]
      );
      
      // 如果資料庫找不到這個人
      if (currentRes.rowCount === 0) {
        return res.status(404).json({ message: '找不到該使用者' });
      }

      const currentHighest = currentRes.rows[0]?.levelfinal || 0;

      // 如果新分數比較高，才更新高度與角色
      if (numericScore > currentHighest) {
        await pool.query(
          `UPDATE users 
           SET levelfinal = $1, final_char = $2 
           WHERE id = $3`,
          [Math.floor(numericScore), character, userId]
        );
        return res.json({ message: '🎉 突破個人最高極限！已更新紀錄。', updated: true });
      } else {
        return res.json({ message: '未超越歷史最高紀錄。', updated: false });
      }
    } 
    
    // 狀況 B：一般新手或災難關卡，維持原本的布林值勾選邏輯
    else {
      const updateRes = await pool.query(
        `UPDATE users SET ${levelColumn} = true WHERE id = $1`,
        [userId]
      );

      // 【修正重點 4】確認資料庫是否真的有這筆資料被更新
      if (updateRes.rowCount === 0) {
        return res.status(404).json({ message: '找不到該使用者，無法更新' });
      }

      return res.json({ message: `關卡 ${levelColumn} 已解鎖。` });
    }

  } catch (err) {
    console.error("❌ Score API 錯誤:", err);
    res.status(500).json({ message: '伺服器內部錯誤' });
  }
});

module.exports = router;