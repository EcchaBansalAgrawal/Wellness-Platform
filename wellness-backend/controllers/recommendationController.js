const Assessment = require("../models/Assessment");

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Get latest assessment for user
    const latestAssessment = await Assessment.findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!latestAssessment) {
      return res.status(200).json({
        recommendations: [
          {
            id: 1,
            title: "Start Tracking",
            description: "Log your first wellness assessment to get personalized recommendations.",
            icon: "📝",
            category: "Getting Started",
            action: "Create Assessment",
          },
        ],
      });
    }

    const recommendations = [];

    // 🔴 High Stress (7+)
    if (latestAssessment.stressLevel >= 7) {
      recommendations.push({
        id: 1,
        title: "⚠️ High Stress Detected",
        description: `Your stress level is ${latestAssessment.stressLevel}/10. Try meditation or breathing exercises.`,
        icon: "🧘",
        category: "Stress Management",
        action: "Book Meditation",
        priority: "high",
      });
    }

    // 🟡 Moderate Stress (5-6)
    if (latestAssessment.stressLevel >= 5 && latestAssessment.stressLevel < 7) {
      recommendations.push({
        id: 2,
        title: "📊 Moderate Stress Level",
        description: "Consider yoga or light exercise to manage stress better.",
        icon: "🧘‍♀️",
        category: "Stress Management",
        action: "Book Yoga",
        priority: "medium",
      });
    }

    // 😴 Low Sleep (<6 hours)
    if (latestAssessment.sleepHours < 6) {
      recommendations.push({
        id: 3,
        title: "😴 Insufficient Sleep",
        description: `You got ${latestAssessment.sleepHours}hrs. Aim for 7-8 hours for better wellness.`,
        icon: "🛌",
        category: "Sleep Health",
        action: "Sleep Tips",
        priority: "high",
      });
    }

    // 😔 Negative Mood
    if (["Sad", "Anxious"].includes(latestAssessment.mood)) {
      recommendations.push({
        id: 4,
        title: `💙 Feeling ${latestAssessment.mood}?`,
        description: "Consider talking to a counselor or therapist for support.",
        icon: "💬",
        category: "Mental Health",
        action: "Book Consultation",
        priority: "high",
      });
    }

    // 😊 Great Mood
    if (["Happy"].includes(latestAssessment.mood)) {
      recommendations.push({
        id: 5,
        title: "🌟 Maintain Your Wellness!",
        description: "Keep up the great work! Continue your healthy habits.",
        icon: "✨",
        category: "Positive Reinforcement",
        action: "View Progress",
        priority: "low",
      });
    }

    // 💪 Good Sleep (8+ hours) + Low Stress
    if (latestAssessment.sleepHours >= 8 && latestAssessment.stressLevel <= 3) {
      recommendations.push({
        id: 6,
        title: "💪 Excellent Balance Achieved!",
        description: "Your sleep and stress levels are optimal. You're doing great!",
        icon: "🎯",
        category: "Positive Reinforcement",
        action: "Share Progress",
        priority: "low",
      });
    }

    // General Fitness
    if (!recommendations.some((r) => r.category === "Mental Health")) {
      recommendations.push({
        id: 7,
        title: "🏃 Stay Active",
        description: "Regular exercise improves both physical and mental health.",
        icon: "🏋️",
        category: "Fitness",
        action: "Book Fitness Session",
        priority: "medium",
      });
    }

    res.json({
      lastAssessment: {
        mood: latestAssessment.mood,
        stressLevel: latestAssessment.stressLevel,
        sleepHours: latestAssessment.sleepHours,
        date: latestAssessment.createdAt,
      },
      recommendations: recommendations.sort((a, b) => {
        // Sort by priority: high > medium > low
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
