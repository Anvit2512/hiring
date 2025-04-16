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
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 


const SignModel = getSignupModel();

const jwt = require('jsonwebtoken');  // Import jsonwebtoken library
require('dotenv').config();
const yourSecretKey = process.env.SEC_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

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
        // Generate a JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },  // User payload (you can add more data as needed)
          yourSecretKey,                      // Secret key for signing the token (should be kept secure)
          { expiresIn: '1h' }                   // Set token expiry time (1 hour in this case)
        );

        // Send response with the token
        resp.json({
          status: true,
          msg: 'Authenticated successfully',
          token: token,  // Send the token back to the client
        });
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

// -------------------------Google signIn--------------------------
async function doGoogleLogin(req, resp) {
  const { token } = req.body; 

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID, 
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await SignModel.findOne({ email: email });

    if (!user) {
      // If user doesn't exist, create a new one
      user = new SignModel({
        email: email,
        name: name,
        pass: "GOOGLE_AUTH",  // Dummy password
      });
      await user.save();
    }

    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SEC_KEY,
      { expiresIn: '1h' }
    );

    resp.json({
      status: true,
      msg: 'Google login successful',
      token: authToken,
    });

  } catch (error) {
    console.error('Google Login Error:', error);
    resp.status(400).json({ status: false, msg: 'Invalid Google token', error: error.message });
  }
}


async function processForm(req, resp) {
  console.log("Received request body:", req.body);
  const { name, company, position, jobDescription } = req.body;

  let suggestedCourses = [];

  // Course suggestions based on job position
  if (position.toLowerCase().includes("cyber security")) {
    suggestedCourses = [
      {
        courseName: "Cyber Security Essentials - Coursera",
        description: "Learn the basics of cyber security and the principles of protecting networks.",
        skills: [
          { skillName: "Network security" },
          { skillName: "Ethical hacking" },
          { skillName: "Threat detection" },
        ],
      },
      {
        courseName: "Advanced Cyber Security - Udemy",
        description: "A deep dive into advanced cyber security topics like penetration testing.",
        skills: [
          { skillName: "Penetration testing" },
          { skillName: "Cryptography" },
          { skillName: "Malware analysis" },
        ],
      },
      {
        courseName: "Cyber Security Certification - EdX",
        description: "Certification course focusing on the development of practical cyber defense skills.",
        skills: [
          { skillName: "Incident response" },
          { skillName: "Firewall management" },
          { skillName: "Risk management" },
        ],
      },
      {
        courseName: "Ethical Hacking - Udemy",
        description: "Learn how to think like a hacker and defend systems against attacks.",
        skills: [
          { skillName: "Ethical hacking" },
          { skillName: "System penetration" },
          { skillName: "Vulnerability assessment" },
        ],
      },
    ];
  } else if (position.toLowerCase().includes("web development")) {
    suggestedCourses = [
      {
        courseName: "The Complete Web Developer Course 2.0",
        description: "This comprehensive course covers front-end and back-end web development, including HTML, CSS, JavaScript, React, Node.js, and database integration",
        skills: [
          { skillName: "HTML, CSS, JavaScript" },
          { skillName: "React.js" },
          { skillName: "Database Management" },
        ],
      },
      {
        courseName: "Front-End Web Development with React",
        description: "Learn how to build responsive and dynamic web applications using React, along with best practices for modern front-end development.",
        skills: [
          { skillName: "React" },
          { skillName: "Javascript" },
          { skillName: "Responsive Design" },
        ],
      },
      {
        courseName: "Python and Django Full Stack Web Developer Bootcamp",
        description: "This course teaches full-stack web development using Python and Django, including back-end development and API integration..",
        skills: [
          { skillName: "Python" },
          { skillName: "Django" },
          { skillName: "API Development" },
        ],
      },
      {
        courseName: "Web Application Development - Udacity",
        description: "Learn to build secure, scalable web applications with a modern tech stack.",
        skills: [
          { skillName: "Web application development" },
          { skillName: "Security practices" },
          { skillName: "API development" },
        ],
      },
    ];
  } else if (position.toLowerCase().includes("blockchain")) {
    suggestedCourses = [
      {
        courseName: "Blockchain Basics - Coursera",
        description: "Introduction to blockchain technology, its use cases, and how to build decentralized applications.",
        skills: [
          { skillName: "Blockchain fundamentals" },
          { skillName: "Cryptocurrency" },
          { skillName: "Smart contracts" },
        ],
      },
      {
        courseName: "Ethereum and Solidity - Udemy",
        description: "Learn to develop decentralized applications using Ethereum and Solidity programming language.",
        skills: [
          { skillName: "Solidity" },
          { skillName: "Ethereum development" },
          { skillName: "Smart contract deployment" },
        ],
      },
      {
        courseName: "Blockchain Development - edX",
        description: "Build and deploy blockchain applications with advanced techniques in blockchain technology.",
        skills: [
          { skillName: "Blockchain architecture" },
          { skillName: "Distributed ledgers" },
          { skillName: "Consensus mechanisms" },
        ],
      },
      {
        courseName: "Blockchain for Business - Coursera",
        description: "Understand how blockchain can be used for business applications and decentralized finance.",
        skills: [
          { skillName: "Blockchain for business" },
          { skillName: "Smart contract design" },
          { skillName: "Supply chain blockchain" },
        ],
      },
    ];
  } else if (position.toLowerCase().includes("software")) {
    suggestedCourses = [
      {
        courseName: "Java Programming and Software Engineering Fundamentals",
        description: "This course covers the fundamentals of Java programming and software engineering principles, focusing on the development of software applications",
        skills: [
          { skillName: "Java Programming" },
          { skillName: "Software Development Principles" },
          { skillName: "Debugging Techniques" },
        ],
      },
      {
        courseName: "Python for Everybody Specialization",
        description: "A comprehensive introduction to Python programming, this course includes data structures, web scraping, and working with databases, preparing you for practical applications in software development.",
        skills: [
          { skillName: "Python Programming" },
          { skillName: "Data Structures" },
          { skillName: "Web Development Basics" },
        ],
      },
      {
        courseName: "Agile Software Development",
        description: "This course introduces Agile methodologies, including Scrum and Kanban, and emphasizes collaboration, flexibility, and delivering value throughout the software development lifecycle",
        skills: [
          { skillName: "Agile Methodologies" },
          { skillName: "Scrum Framework" },
          { skillName: "Team Collaboration Techniques" },
        ],
      },
      {
        courseName: "Software Development Lifecycle - LinkedIn Learning",
        description: "Understand the complete software development lifecycle and best practices in each phase.",
        skills: [
          { skillName: "SDLC" },
          { skillName: "Version control" },
          { skillName: "Continuous integration" },
        ],
      },
    ];
  } else if (position.toLowerCase().includes("network")) {
    suggestedCourses = [
      {
        courseName: "Networking Essentials - Cisco",
        description: "Introduction to computer networking, covering topics like IP addressing and protocols.",
        skills: [
          { skillName: "Networking protocols" },
          { skillName: "IP addressing" },
          { skillName: "Router configuration" },
        ],
      },
      {
        courseName: "Advanced Networking - Udemy",
        description: "Learn advanced networking concepts like VPN, LAN/WAN configuration, and troubleshooting.",
        skills: [
          { skillName: "VPN configuration" },
          { skillName: "Troubleshooting" },
          { skillName: "LAN/WAN setup" },
        ],
      },
      {
        courseName: "Network Security Fundamentals - Coursera",
        description: "Learn the basics of securing network infrastructure, including firewalls and intrusion detection.",
        skills: [
          { skillName: "Network security" },
          { skillName: "Firewall configuration" },
          { skillName: "Intrusion detection" },
        ],
      },
      {
        courseName: "Cisco Certified Network Associate (CCNA) - Udemy",
        description: "Preparation for the Cisco CCNA certification exam covering network fundamentals and routing.",
        skills: [
          { skillName: "Cisco networking" },
          { skillName: "Routing protocols" },
          { skillName: "Network troubleshooting" },
        ],
      },
    ];
  } else if (position.toLowerCase().includes("machine learning")) {
    suggestedCourses = [
      {
        courseName: "Deep Learning Specialization by Andrew Ng",
        description: "This specialization covers the fundamentals of deep learning, including neural networks, convolutional networks, and sequence models, using TensorFlow and Keras.",
        skills: [
          { skillName: "Deep learning" },
          { skillName: "Neural Networks" },
          { skillName: "TensorFlow" },
        ],
      },
      {
        courseName: "Machine Learning with Python by IBM",
        description: "This course introduces machine learning concepts and teaches how to implement algorithms using Python, including supervised and unsupervised learning techniques",
        skills: [
          { skillName: "Machine Learning Algorithms" },
          { skillName: "Python Programming" },
          { skillName: "Model Evaluation" },
        ],
      },
      {
        courseName: "Cloud Computing for Machine Learning by Google Cloud",
        description: "Learn how to use Google Cloud's tools and services to build and deploy machine learning models in a cloud environment, covering best practices for scalability and performance.",
        skills: [
          { skillName: "Cloud Computing" },
          { skillName: "Google Cloud Platform (GCP)" },
          { skillName: "Model Deployment" },
        ],
      },
      {
        courseName: "Python for Data Science and Machine Learning - Udemy",
        description: "Learn Python programming and its application in data science and ML.",
        skills: [
          { skillName: "Python for data analysis" },
          { skillName: "Machine learning with scikit-learn" },
          { skillName: "Data visualization with Matplotlib" },
        ],
      },
    ];
  } else if (position.toLowerCase().includes("cloud")) {
    suggestedCourses = [
      {
        courseName: "AWS Certified Solutions Architect - Associate",
        description: "Prepare for AWS certification with hands-on labs and practice exams.",
        skills: [
          { skillName: "AWS architecture" },
          { skillName: "Cloud services design" },
          { skillName: "Scalability and reliability" },
        ],
      },
      {
        courseName: "Terraform on Azure: The Complete Guide",
        description: "Learn how to deploy and manage infrastructure on Azure using Terraform, focusing on Infrastructure as Code principles.",
        skills: [
          { skillName: "Infrastructure as Code" },
          { skillName: "Terraform" },
          { skillName: "Azure management" },
        ],
      },
      {
        courseName: "Python for Cloud Engineering",
        description: "This course teaches Python programming with a focus on its application in cloud engineering, including automation and scripting",
        skills: [
          { skillName: "Python programming" },
          { skillName: "Data pipelines with Apache BeamScripting for cloud automation" },
          { skillName: "Cloud API integration" },
        ],
      },
      {
        courseName: "Cloud Computing with Google Cloud - Coursera",
        description: "Introduction to cloud computing and how to use Google Cloud services effectively.",
        skills: [
          { skillName: "Cloud deployment" },
          { skillName: "Google Cloud tools" },
          { skillName: "Cloud-based data storage" },
        ],
      },
    ];
  } else if (position.toLowerCase().includes("data")) {
    suggestedCourses = [
      {
        courseName: "Data Visualization with Tableau",
        description: "This course covers the fundamentals of Tableau, teaching you how to create interactive dashboards and visualizations that convey insights from your data.",
        skills: [
          { skillName: "Data Visualization" },
          { skillName: "Dashboard Creation" },
          { skillName: "Data Storytelling" },
        ],
      },
      {
        courseName: "SQL for Data Science",
        description: "Learn how to use SQL for data analysis, including querying databases, managing data, and performing statistical analyses.",
        skills: [
          { skillName: "SQL Proficiency" },
          { skillName: "Data Querying" },
          { skillName: "Database Management" },
        ],
      },
      {
        courseName: "Excel Data Analysis: Tips and Tricks",
        description: "This course focuses on advanced Excel techniques for data analysis, including formulas, pivot tables, and data visualization tools",
        skills: [
          { skillName: "Advanced Excel Skills" },
          { skillName: "Data Manipulation" },
          { skillName: "Statistical Analysis" },
        ],
      },
      {
        courseName: "Business Analytics with Excel - Udemy",
        description: "Master the use of Excel for advanced data analysis in business.",
        skills: [
          { skillName: "Excel pivot tables" },
          { skillName: "Data modeling in Excel" },
          { skillName: "Business reporting and analysis" },
        ],
      },
    ];
  } else {
    // Default suggestions for other roles
    suggestedCourses = [
      {
        courseName: "Communication Skills for Leaders - Udemy",
        description: "Improve leadership and team communication skills.",
        skills: [
          { skillName: "Public speaking" },
          { skillName: "Active listening" },
          { skillName: "Team management" },
        ],
      },
      {
        courseName: "Time Management for Professionals - LinkedIn Learning",
        description: "Master time management techniques to boost productivity.",
        skills: [
          { skillName: "Prioritization" },
          { skillName: "Task delegation" },
          { skillName: "Work-life balance strategies" },
        ],
      },
      {
        courseName: "Leadership and Influence - Coursera",
        description: "Develop leadership and influence skills to excel in any professional role.",
        skills: [
          { skillName: "Leadership styles" },
          { skillName: "Decision-making" },
          { skillName: "Conflict resolution" },
        ],
      },
      {
        courseName: "Emotional Intelligence at Work - LinkedIn Learning",
        description: "Develop emotional intelligence to improve workplace relationships and decision-making.",
        skills: [
          { skillName: "Emotional awareness" },
          { skillName: "Empathy in leadership" },
          { skillName: "Conflict management" },
        ],
      },
    ];
  }

  try {
    const jobSuggestion = new JobSuggestionModel({
      name,
      company,
      position,
      jobDescription,
      suggestedCourses,
    });

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

async function getSuggestionsById(req, res) {
  const { id } = req.params;

  try {
    const jobSuggestions = await JobSuggestionModel.findById(id);
    if (!jobSuggestions) {
      return res.status(404).json({
        status: false,
        message: "No suggestions found for the given ID",
      });
    }

    res.status(200).json({
      status: true,
      data: jobSuggestions,
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

module.exports = { doSaveUserSignup, doSaveUserSignin, doGoogleLogin, processForm, fetchSuggestions, handleJobSuggestion,getSuggestionsById};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
