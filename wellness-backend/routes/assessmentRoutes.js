const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addAssessment,
  getAllAssessments,
} = require("../controllers/assessmentController");

// ✅ routes
router.post("/add", auth, addAssessment);
router.get("/all", getAllAssessments);
router.get("/user/:userId", getAllAssessments);

module.exports = router;