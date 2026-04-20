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