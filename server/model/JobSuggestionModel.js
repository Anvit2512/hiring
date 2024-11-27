// const mongoose = require("mongoose");

// function getJobSuggestionModel() {
//   const JobSuggestionSchema = new mongoose.Schema(
//     {
//       name: { type: String, required: true },
//       company: { type: String, required: true },
//       position: { type: String, required: true },
//       jobDescription: { type: String, required: true },
//       suggestedCourses: { type: Array, default: [] }, // Array of suggested courses
//     },
//     {
//       versionKey: false,
//     }
//   );

//   const JobSuggestionModel = mongoose.model("jobSuggestions", JobSuggestionSchema);
//   return JobSuggestionModel;
// }

// module.exports = { getJobSuggestionModel };


const mongoose = require("mongoose");

function getJobSuggestionModel() {
  // Define a sub-schema for suggested courses
  const CourseSchema = new mongoose.Schema(
    {
      courseName: { type: String, required: true }, // Field for course name
      description: { type: String, required: true }, // Field for course description
    },
    { _id: false } // Prevent creation of `_id` for sub-documents
  );

  // Main schema for job suggestions
  const JobSuggestionSchema = new mongoose.Schema(
    {
      name: { type: String, required: true }, // User's name
      company: { type: String, required: true }, // Company name
      position: { type: String, required: true }, // Job position
      jobDescription: { type: String, required: true }, // Job description
      suggestedCourses: { type: [CourseSchema], default: [] }, // Array of suggested courses
    },
    {
      versionKey: false, // Disables the `__v` field
    }
  );

  // Create and return the model
  const JobSuggestionModel = mongoose.model("jobSuggestions", JobSuggestionSchema);
  return JobSuggestionModel;
}

module.exports = { getJobSuggestionModel };
