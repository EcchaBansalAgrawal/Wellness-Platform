const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const recommendationController = require("../controllers/recommendationController");

// ✅ Get personalized recommendations (requires auth)
router.get("/", authMiddleware, recommendationController.getRecommendations);

module.exports = router;
