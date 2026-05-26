const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const { verifyToken } = require('./auth'); 

// 更新通關紀錄或最高高度
router.post('/update-level', verifyToken, async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: '未授權或無法取得使用者資訊' });
  }

  const userId = req.user.userId;
  const { levelColumn, score, character } = req.body;

  // 1. 將新的 'levelgesture' 加入允許的欄位名單
  const allowedColumns = ["levelnew", "levelflood", "levelfire", "levelwind", "levelfinal", "levelgesture"];
  if (!allowedColumns.includes(levelColumn)) {
    return res.status(400).json({ message: '無效的欄位名稱' });
  }

  try {
    // 2. 將判斷邏輯擴充，同時支援一般模式(levelfinal)與手勢模式(levelgesture)
    if (levelColumn === 'levelfinal' || levelColumn === 'levelgesture') {
      if (score === undefined || !character) {
        return res.status(400).json({ message: '缺少高度或角色參數' });
      }

      const numericScore = Number(score);
      if (isNaN(numericScore)) {
        return res.status(400).json({ message: '分數格式錯誤' });
      }

      const currentRes = await pool.query(
        `SELECT ${levelColumn} FROM users WHERE id = $1`, 
        [userId]
      );
      
      if (currentRes.rowCount === 0) {
        return res.status(404).json({ message: '找不到該使用者' });
      }

      // 動態抓取該模式目前的最高分
      const currentHighest = currentRes.rows[0]?.[levelColumn] || 0;

      if (numericScore > currentHighest) {
        // 判斷要更新的角色欄位是哪一個
        const charColumn = levelColumn === 'levelfinal' ? 'final_char' : 'gesture_char';
        
        await pool.query(
          `UPDATE users SET ${levelColumn} = $1, ${charColumn} = $2 WHERE id = $3`,
          [Math.floor(numericScore), character, userId]
        );
        return res.json({ message: '🎉 突破個人最高極限！已更新紀錄。', updated: true });
      } else {
        return res.json({ message: '未超越歷史最高紀錄。', updated: false });
      }
    } 
    else {
      // 其他一般關卡解鎖邏輯保持不變
      const updateRes = await pool.query(
        `UPDATE users SET ${levelColumn} = true WHERE id = $1`,
        [userId]
      );

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

// 3. 修改排行榜 API，接受模式參數 (mode)
router.get('/leaderboard', async (req, res) => {
  try {
    // 預設抓取一般遊玩(normal)，如果有傳入 mode=gesture 則抓取手勢遊玩
    const mode = req.query.mode; 
    const scoreCol = mode === 'gesture' ? 'levelgesture' : 'levelfinal';
    const charCol = mode === 'gesture' ? 'gesture_char' : 'final_char';

    // 這裡我們在 SQL 中使用 AS 幫欄位統一命名為 score 和 character，方便前端統一處理資料
    const result = await pool.query(
      `SELECT 
        username, 
        avatar, 
        ${scoreCol} AS score, 
        ${charCol} AS character
       FROM users 
       WHERE ${scoreCol} > 0 
       ORDER BY ${scoreCol} DESC 
       LIMIT 10`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ 取得排行榜錯誤:", err);
    res.status(500).json({ message: '伺服器內部錯誤' });
  }
});

//通關狀態
router.get('/levels', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT levelfire, levelflood, levelwind FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: '找不到使用者' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ 取得通關資料錯誤:", err);
    res.status(500).json({ message: '伺服器內部錯誤' });
  }
});

module.exports = router;

