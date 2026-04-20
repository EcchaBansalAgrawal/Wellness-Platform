const db = require("../config/db");

exports.getDashboard = (req, res) => {
  const user_id = req.user.id;

  // 1️⃣ Get latest assessment
  const latestQuery = `
    SELECT * FROM assessments 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `;

  // 2️⃣ Get average score
  const avgQuery = `
    SELECT AVG(score) AS avgScore 
    FROM assessments 
    WHERE user_id = ?
  `;

  // 3️⃣ Get trend (last 7 records)
  const trendQuery = `
    SELECT score, created_at 
    FROM assessments 
    WHERE user_id = ? 
    ORDER BY created_at ASC 
    LIMIT 7
  `;

  db.query(latestQuery, [user_id], (err, latestResult) => {
    if (err) return res.status(500).json(err);

    db.query(avgQuery, [user_id], (err, avgResult) => {
      if (err) return res.status(500).json(err);

      db.query(trendQuery, [user_id], (err, trendResult) => {
        if (err) return res.status(500).json(err);

        const latest = latestResult[0] || {};
        const trend = trendResult.map(item => item.score);

        res.json({
          latestScore: latest.score || 0,
          averageScore: avgResult[0].avgScore || 0,
          trend,
          categories: {
            physical: latest.physical || 0,
            mental: latest.mental || 0,
            emotional: latest.emotional || 0,
            lifestyle: latest.lifestyle || 0
          }
        });
      });
    });
  });
};