const Feedback = require('../models/Feedback');

exports.addFeedback = async (req, res) => {
  try {
    const { recommendationId, rating, comments, actionTaken } = req.body;
    const userId = req.user.id;

    const feedback = new Feedback({
      userId,
      recommendationId,
      rating,
      comments,
      actionTaken,
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback saved', data: feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserFeedback = async (req, res) => {
  try {
    const userId = req.user.id;

    const feedback = await Feedback.find({ userId }).sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFeedbackStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const feedback = await Feedback.find({ userId });

    const stats = {
      totalFeedback: feedback.length,
      averageRating: feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : 0,
      actionTakenCount: feedback.filter(f => f.actionTaken).length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
