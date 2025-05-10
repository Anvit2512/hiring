// models/userRecommendationModel.js
const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobSuggestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSuggestion",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("UserRecommendation", recommendationSchema);