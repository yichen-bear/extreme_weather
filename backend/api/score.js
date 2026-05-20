const express = require('express');
const router = express.Router();
const pool = require('../db'); // 確保路徑與你原本的一致
const verifyToken = require('./auth'); // 假設你有驗證中間件

// 更新通關紀錄或最高高度
router.post('/update-level', verifyToken, async (req, res) => {
  const { levelColumn, score, character } = req.body;
  const userId = req.user.id; // 從 JWT Token 解析出來的用戶 ID

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

      // 先查詢目前資料庫裡的最高高度
      const currentRes = await pool.query(
        `SELECT levelfinal FROM users WHERE user_id = $1`, 
        [userId]
      );
      
      const currentHighest = currentRes.rows[0]?.levelfinal || 0;

      // 如果新分數比較高，才更新高度與角色
      if (score > currentHighest) {
        await pool.query(
          `UPDATE users 
           SET levelfinal = $1, final_char = $2 
           WHERE user_id = $3`,
          [Math.floor(score), character, userId]
        );
        return res.json({ message: '🎉 突破個人最高極限！已更新紀錄。', updated: true });
      } else {
        return res.json({ message: '未超越歷史最高紀錄。', updated: false });
      }
    } 
    
    // 狀況 B：一般新手或災難關卡，維持原本的布林值勾選邏輯
    else {
      await pool.query(
        `UPDATE users SET ${levelColumn} = true WHERE user_id = $1`,
        [userId]
      );
      return res.json({ message: `關卡 ${levelColumn} 已解鎖。` });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器內部錯誤' });
  }
});

module.exports = router;