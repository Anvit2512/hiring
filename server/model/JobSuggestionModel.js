const mongoose = require("mongoose");

function getJobSuggestionModel() {
  const JobSuggestionSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      company: { type: String, required: true },
      position: { type: String, required: true },
      jobDescription: { type: String, required: true },
      suggestedCourses: { type: Array, default: [] }, // Array of suggested courses
    },
    {
      versionKey: false,
    }
  );

  const JobSuggestionModel = mongoose.model("jobSuggestions", JobSuggestionSchema);
  return JobSuggestionModel;
}

module.exports = { getJobSuggestionModel };
