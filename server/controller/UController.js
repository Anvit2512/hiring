// var bodyparser = require("body-parser");
// const path = require('path');
// const express = require("express");
// const app = express();
// var fileupload = require('express-fileupload');
// app.use(fileupload());
// var bodyparser = require("body-parser");
// const { getSignupModel } = require('../model/SignupModel');
// const { getJobSuggestionModel } = require("../model/JobSuggestionModel");
// const JobSuggestionModel = getJobSuggestionModel();



// const SignModel = getSignupModel();
// // FOR JSON WEB TOKEN ============
// // const dotenv=require("dotenv");
// // const jwt=require("jsonwebtoken");
// //================================

// function doSaveUserSignup(req, resp) {
//   //console.log(req.body)
//   const doc = new SignModel(req.body);
//   doc.save().then((retDoc) => {
//     resp.set("json");
//     resp.json({ status: true, rec: retDoc });//retDoc is an object
//   }).catch((err) => {
//     resp.json({ status: false, err: err.message, req: req.body });//retDoc is an object
//   })
// }

// function doSaveUserSignin(req, resp) {
//   const { email, pass } = req.body;

//   // Check if the email exists in the database
//   SignModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       // Check if the password matches
//       if (user.pass === pass) {
//         resp.json({ status: true, msg: user });
//       } else {
//         // Incorrect password
//         resp.json({ status: false, msg: "Incorrect Email or Password" });
//       }
//     } else {
//       // Email not found in the database
//       resp.json({ status: false, msg: "There is No Account Registered with this Email Address" });
//     }
//   }).catch((err) => {
//     resp.json({ status: false, err: err.message });
//   });
// }

// async function processForm(req, resp) {
//   console.log("Received request body:", req.body);
//   const { name, company, position, jobDescription } = req.body;
  
//   // Save form data to the database
//   try {
//     const jobSuggestion = new JobSuggestionModel({
//       name,
//       company,
//       position,
//       jobDescription,
//     });

//     console.log("Saving data:", jobSuggestion);

//     // Generate sample suggestions (Replace with actual processing logic)
//     jobSuggestion.suggestedCourses = [
//       {
//         coarsename:"Course A: Advanced React",
//         description:"This is coarse A that is advanced React and u will learn "
//       },
//       {
//         coarsename:"Course B: Leadership in Tech",
//         description:"This is coarse B that is advanced React and u will learn "
//       },
//       {
//         coarsename:"Course C: Data Structures Mastery",
//         description:"This is coarse C that is advanced React and u will learn"
//       },
//     ];

//     const savedDoc = await jobSuggestion.save();
//     console.log("Saved document:", savedDoc);

//     resp.json({ status: true, message: "Data processed successfully", data: savedDoc });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     resp.json({ status: false, message: error.message });
//   }
// }





// async function fetchSuggestions(req, resp) {
//   const { id } = req.params;

//   try {
//     const suggestions = await JobSuggestionModel.findById(id);

//     if (suggestions) {
//       // Format the response to include suggested courses and associated skills
//       const formattedSuggestions = suggestions.suggestedCourses.map((course) => ({
//         courseName: course.courseName,
//         description: course.description,
//         skills: course.skills.map((skill) => skill.skillName), // Extract only skill names
//       }));

//       resp.json({
//         status: true,
//         data: {
//           name: suggestions.name,
//           company: suggestions.company,
//           position: suggestions.position,
//           jobDescription: suggestions.jobDescription,
//           suggestedCourses: formattedSuggestions,
//         },
//       });
//     } else {
//       resp.json({ status: false, message: "Suggestions not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching suggestions:", error);
//     resp.json({ status: false, message: error.message });
//   }
// }



// module.exports = { doSaveUserSignup, doSaveUserSignin, processForm, fetchSuggestions };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const axios = require('axios');
var bodyparser = require("body-parser");
const path = require('path');
const express = require("express");
const app = express();
var fileupload = require('express-fileupload');
app.use(fileupload());
var bodyparser = require("body-parser");
const { getSignupModel } = require('../model/SignupModel');
const { getJobSuggestionModel } = require("../model/JobSuggestionModel");
const JobSuggestionModel = getJobSuggestionModel();

const SignModel = getSignupModel();

function doSaveUserSignup(req, resp) {
  const doc = new SignModel(req.body);
  doc.save().then((retDoc) => {
    resp.set("json");
    resp.json({ status: true, rec: retDoc }); // retDoc is an object
  }).catch((err) => {
    resp.json({ status: false, err: err.message, req: req.body });
  });
}

function doSaveUserSignin(req, resp) {
  const { email, pass } = req.body;

  SignModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.pass === pass) {
        resp.json({ status: true, msg: user });
      } else {
        resp.json({ status: false, msg: "Incorrect Email or Password" });
      }
    } else {
      resp.json({ status: false, msg: "There is No Account Registered with this Email Address" });
    }
  }).catch((err) => {
    resp.json({ status: false, err: err.message });
  });
}

async function processForm(req, resp) {
  console.log("Received request body:", req.body);
  const { name, company, position, jobDescription } = req.body;

  try {
    const jobSuggestion = new JobSuggestionModel({
      name,
      company,
      position,
      jobDescription,
    });

    // Generate sample suggestions (Replace with actual processing logic)
    jobSuggestion.suggestedCourses = [
      {
        courseName: "Data Analysis with Python - Coursera",
        description: "Learn how to analyze and visualize data using Python.",
        skills: [
          { skillName: "Python for data analysis" },
          { skillName: "Data manipulation with Pandas" },
          { skillName: "Data visualization techniques using Matplotlib and Seaborn" },
        ],
      },
      {
        courseName: "SQL for Data Science - Coursera",
        description: "Master SQL for querying and analyzing data from relational databases.",
        skills: [
          { skillName: "Writing SQL queries to extract data" },
          { skillName: "Data aggregation and filtering" },
          { skillName: "Working with relational databases" },
        ],
      },
      {
        courseName: "Data Visualization with Tableau - Udacity",
        description: "Create interactive dashboards and present data insights effectively.",
        skills: [
          { skillName: "Creating interactive dashboards and reports" },
          { skillName: "Understanding design principles for effective data visualization" },
          { skillName: "Using Tableau for data storytelling and insights presentation" },
        ],
      },
    ];

    const savedDoc = await jobSuggestion.save();
    console.log("Saved document:", savedDoc);

    resp.json({ status: true, message: "Data processed successfully", data: savedDoc });
  } catch (error) {
    console.error("Error saving data:", error);
    resp.json({ status: false, message: error.message });
  }
}

// async function fetchSuggestions(req, resp) {
//   const { id } = req.params;

//   try {
//     const suggestions = await JobSuggestionModel.findById(id);

//     if (suggestions) {
//       resp.json({ status: true, data: suggestions });
//     } else {
//       resp.json({ status: false, message: "Suggestions not found" });
//     }
//   } catch (error) {
//     resp.json({ status: false, message: error.message });
//   }
// }


async function saveJobSuggestionToDB(username, company, position, jobDescription, recommendations) {
  const JobSuggestion = getJobSuggestionModel();

  const suggestedCourses = parseRecommendations(recommendations);

  const jobSuggestionData = {
    name: username,
    company: company,
    position: position,
    jobDescription: jobDescription,
    suggestedCourses: suggestedCourses,
  };

  try {
    const result = await JobSuggestion.create(jobSuggestionData);
    console.log('Job suggestion saved:', result);
    return result;
  } catch (error) {
    console.error('Error saving job suggestion to DB:', error);
    throw new Error('Unable to save job suggestion');
  }
}


async function fetchSuggestions(username, company, position, jobDescription) {
  try {
    const response = await axios.post('http://localhost:8000/recommend-skills/', {
      username: username,
      company: company,
      position: position,
      job_description: jobDescription,
    });

    return response.data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw new Error('Unable to fetch recommendations');
  }
}

// Parse the recommendations response from FastAPI
function parseRecommendations(recommendations) {
  const courses = [];
  const lines = recommendations.split('\n');

  let currentCourse = null;

  lines.forEach((line) => {
    if (line.startsWith('Course')) {
      // If a new course starts
      if (currentCourse) {
        courses.push(currentCourse);
      }
      const courseInfo = line.split(': ')[1].split(' - ');
      currentCourse = {
        courseName: courseInfo[0],
        description: courseInfo[1],
        skills: [],
      };
    } else if (line.startsWith('Skill')) {
      // If a skill is listed
      if (currentCourse) {
        const skillName = line.split(': ')[1];
        currentCourse.skills.push({ skillName });
      }
    }
  });

  // Push the last course
  if (currentCourse) {
    courses.push(currentCourse);
  }

  return courses;
}
// Controller function for handling the job suggestion request
async function handleJobSuggestion(req, res) {
  const { username, company, position, jobDescription } = req.body;

  try {
    const recommendations = await fetchSuggestions(username, company, position, jobDescription);
    const savedData = await saveJobSuggestionToDB(username, company, position, jobDescription, recommendations);

    res.status(200).json({
      message: 'Job suggestion and recommendations saved successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error in handleJobSuggestion:', error);
    res.status(500).json({
      message: 'Error processing the job suggestion request',
      error: error.message,
    });
  }
}


module.exports = { doSaveUserSignup, doSaveUserSignin, processForm, fetchSuggestions, handleJobSuggestion};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
