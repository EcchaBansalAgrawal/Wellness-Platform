const Assessment = require('../models/Assessment');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all assessments for user
    const assessments = await Assessment.find({ userId }).sort({ createdAt: -1 });

    if (assessments.length === 0) {
      return res.json({
        latestScore: 0,
        averageScore: 0,
        trend: [],
        categories: { physical: 0, mental: 0, emotional: 0, lifestyle: 0 },
        insights: ['No data available. Start by logging your wellness assessments.']
      });
    }

    // Calculate score for each assessment (simple formula: sleep + (10 - stress))
    const assessmentsWithScores = assessments.map(a => ({
      ...a.toObject(),
      score: a.sleepHours + (10 - a.stressLevel)
    }));

    const latest = assessmentsWithScores[0];

    // Average score
    const totalScore = assessmentsWithScores.reduce((sum, a) => sum + a.score, 0);
    const averageScore = (totalScore / assessmentsWithScores.length).toFixed(1);

    // Trend (last 7 scores)
    const trend = assessmentsWithScores.slice(0, 7).map(a => a.score).reverse(); // reverse to show chronological

    // Categories based on latest assessment
    const moodScore = latest.mood === 'Happy' ? 10 : latest.mood === 'Neutral' ? 7 : latest.mood === 'Sad' ? 4 : 2;
    const physical = Math.min(latest.sleepHours * 10, 100); // sleep as percentage
    const mental = (10 - latest.stressLevel) * 10; // stress inverted
    const emotional = moodScore * 10;
    const categories = \{
      physical: Math.min(latest.sleepHours * 10, 100), // sleep as percentage
      mental: (10 - latest.stressLevel) * 10, // stress inverted
      emotional: moodScore * 10,
      lifestyle: Math.round((categories.physical + categories.mental + categories.emotional) / 3) // average
    };

    res.json({
      latestScore: latest.score,
      averageScore: parseFloat(averageScore),
      trend,
      categories,
      latestAssessment: {
        mood: latest.mood,
        stressLevel: latest.stressLevel,
        sleepHours: latest.sleepHours,
        date: latest.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
