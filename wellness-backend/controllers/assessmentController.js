const Assessment = require("../models/Assessment");

exports.addAssessment = async (req, res) => {
  try {
    const { userId, mood, stressLevel, sleepHours, notes } = req.body;

    if (!userId || !mood || !stressLevel || !sleepHours) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const assessment = new Assessment({
      userId,
      mood,
      stressLevel,
      sleepHours,
      notes,
    });

    await assessment.save();

    res.status(201).json({ message: "Assessment saved", data: assessment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAssessments = async (req, res) => {
  try {
    // Support both /all and /user/:userId routes
    const userId = req.params.userId || req.query.userId;

    let data;
    if (userId) {
      data = await Assessment.find({ userId }).sort({ createdAt: -1 });
    } else {
      data = await Assessment.find().sort({ createdAt: -1 });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserInsights = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Get all assessments for user
    const assessments = await Assessment.find({ userId }).sort({ createdAt: -1 });

    if (assessments.length === 0) {
      return res.json({
        insights: ["No data available. Start by logging your wellness assessments."],
        averages: { stressLevel: 0, sleepHours: 0 },
        trends: { stressTrend: "stable", sleepTrend: "stable" },
        recommendations: []
      });
    }

    // Calculate averages
    const totalStress = assessments.reduce((sum, a) => sum + a.stressLevel, 0);
    const totalSleep = assessments.reduce((sum, a) => sum + a.sleepHours, 0);
    const avgStress = (totalStress / assessments.length).toFixed(1);
    const avgSleep = (totalSleep / assessments.length).toFixed(1);

    // Calculate trends (last 7 vs previous 7)
    const recent = assessments.slice(0, 7);
    const previous = assessments.slice(7, 14);

    let stressTrend = "stable";
    let sleepTrend = "stable";

    if (previous.length > 0) {
      const recentAvgStress = recent.reduce((sum, a) => sum + a.stressLevel, 0) / recent.length;
      const prevAvgStress = previous.reduce((sum, a) => sum + a.stressLevel, 0) / previous.length;

      if (recentAvgStress > prevAvgStress + 0.5) stressTrend = "increasing";
      else if (recentAvgStress < prevAvgStress - 0.5) stressTrend = "decreasing";

      const recentAvgSleep = recent.reduce((sum, a) => sum + a.sleepHours, 0) / recent.length;
      const prevAvgSleep = previous.reduce((sum, a) => sum + a.sleepHours, 0) / previous.length;

      if (recentAvgSleep > prevAvgSleep + 0.5) sleepTrend = "improving";
      else if (recentAvgSleep < prevAvgSleep - 0.5) sleepTrend = "declining";
    }

    // Generate insights
    const insights = [];

    if (parseFloat(avgStress) > 7) {
      insights.push("Your average stress level is high. Consider stress management techniques.");
    } else if (parseFloat(avgStress) < 4) {
      insights.push("Your stress levels are well-managed. Keep up the good work!");
    }

    if (parseFloat(avgSleep) < 6) {
      insights.push("Your average sleep is below recommended levels. Aim for 7-8 hours.");
    } else if (parseFloat(avgSleep) >= 8) {
      insights.push("You're getting excellent sleep! This supports overall wellness.");
    }

    if (stressTrend === "increasing") {
      insights.push("Stress levels have been increasing recently. Monitor and address triggers.");
    } else if (stressTrend === "decreasing") {
      insights.push("Great progress! Your stress levels are trending downward.");
    }

    if (sleepTrend === "declining") {
      insights.push("Sleep quality has declined recently. Review your sleep habits.");
    } else if (sleepTrend === "improving") {
      insights.push("Sleep patterns are improving. Continue healthy sleep routines.");
    }

    // Mood analysis
    const moodCounts = assessments.reduce((acc, a) => {
      acc[a.mood] = (acc[a.mood] || 0) + 1;
      return acc;
    }, {});

    const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, "");

    if (dominantMood === "Sad" || dominantMood === "Anxious") {
      insights.push(`Your mood is predominantly ${dominantMood.toLowerCase()}. Consider professional support if needed.`);
    } else if (dominantMood === "Happy") {
      insights.push("You're maintaining a positive mood overall. Excellent!");
    }

    res.json({
      insights,
      averages: {
        stressLevel: parseFloat(avgStress),
        sleepHours: parseFloat(avgSleep)
      },
      trends: {
        stressTrend,
        sleepTrend
      },
      totalAssessments: assessments.length,
      latestAssessment: assessments[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};