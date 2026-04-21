const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  addFeedback,
  getUserFeedback,
  getFeedbackStats,
} = require('../controllers/feedbackController');

router.post('/add', auth, addFeedback);
router.get('/user', auth, getUserFeedback);
router.get('/stats', auth, getFeedbackStats);

module.exports = router;
