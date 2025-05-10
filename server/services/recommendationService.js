// services/recommendationService.js
const { getJobSuggestionModel } = require("../models/jobSuggestionModel");
const UserRecommendation = require("../models/userRecommendationModel");

const JobSuggestion = getJobSuggestionModel();

async function saveRecommendation(userId, recommendationData) {
  // Save job suggestion
  const jobSuggestion = new JobSuggestion({
    name: recommendationData.username,
    company: recommendationData.company,
    position: recommendationData.position,
    jobDescription: recommendationData.job_description,
    suggestedCourses: parseRecommendations(recommendationData.recommendations)
  });
  
  const savedSuggestion = await jobSuggestion.save();

  // Create user-recommendation relationship
  const userRecommendation = new UserRecommendation({
    user: userId,
    jobSuggestion: savedSuggestion._id
  });
  
  await userRecommendation.save();

  return {
    suggestionId: savedSuggestion._id,
    recommendation: recommendationData.recommendations
  };
}

module.exports = {
  saveRecommendation
};