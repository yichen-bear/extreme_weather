const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 只保留這一行，拿掉原本重複的那行 const verifyToken = require('./auth');
const { verifyToken } = require('./auth'); 

// 更新通關紀錄或最高高度
router.post('/update-level', verifyToken, async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: '未授權或無法取得使用者資訊' });
  }

  const userId = req.user.userId;
  const { levelColumn, score, character } = req.body;

  const allowedColumns = ["levelnew", "levelflood", "levelfire", "levelwind", "levelfinal"];
  if (!allowedColumns.includes(levelColumn)) {
    return res.status(400).json({ message: '無效的欄位名稱' });
  }

  try {
    if (levelColumn === 'levelfinal') {
      if (score === undefined || !character) {
        return res.status(400).json({ message: '缺少高度或角色參數' });
      }

      const numericScore = Number(score);
      if (isNaN(numericScore)) {
        return res.status(400).json({ message: '分數格式錯誤' });
      }

      const currentRes = await pool.query(
        `SELECT levelfinal FROM users WHERE id = $1`, 
        [userId]
      );
      
      if (currentRes.rowCount === 0) {
        return res.status(404).json({ message: '找不到該使用者' });
      }

      const currentHighest = currentRes.rows[0]?.levelfinal || 0;

      if (numericScore > currentHighest) {
        await pool.query(
          `UPDATE users SET levelfinal = $1, final_char = $2 WHERE id = $3`,
          [Math.floor(numericScore), character, userId]
        );
        return res.json({ message: '🎉 突破個人最高極限！已更新紀錄。', updated: true });
      } else {
        return res.json({ message: '未超越歷史最高紀錄。', updated: false });
      }
    } 
    else {
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

router.get('/leaderboard', async (req, res) => {
  try {
    // 直接撈取 username, avatar, levelfinal, final_char
    const result = await pool.query(
      `SELECT 
        username, 
        avatar, 
        levelfinal, 
        final_char
       FROM users 
       WHERE levelfinal > 0 
       ORDER BY levelfinal DESC 
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

