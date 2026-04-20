const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: {
      type: String,
      enum: ["Happy", "Neutral", "Sad", "Anxious"],
      required: true,
    },
    stressLevel: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    sleepHours: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);