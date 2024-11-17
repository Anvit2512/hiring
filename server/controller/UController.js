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
// FOR JSON WEB TOKEN ============
// const dotenv=require("dotenv");
// const jwt=require("jsonwebtoken");
//================================

function doSaveUserSignup(req, resp) {
  //console.log(req.body)
  const doc = new SignModel(req.body);
  doc.save().then((retDoc) => {
    resp.set("json");
    resp.json({ status: true, rec: retDoc });//retDoc is an object
  }).catch((err) => {
    resp.json({ status: false, err: err.message, req: req.body });//retDoc is an object
  })
}

function doSaveUserSignin(req, resp) {
  const { email, pass } = req.body;

  // Check if the email exists in the database
  SignModel.findOne({ email: email }).then((user) => {
    if (user) {
      // Check if the password matches
      if (user.pass === pass) {
        resp.json({ status: true, msg: user });
      } else {
        // Incorrect password
        resp.json({ status: false, msg: "Incorrect Email or Password" });
      }
    } else {
      // Email not found in the database
      resp.json({ status: false, msg: "There is No Account Registered with this Email Address" });
    }
  }).catch((err) => {
    resp.json({ status: false, err: err.message });
  });
}

async function processForm(req, resp) {
  console.log("Received request body:", req.body);
  const { name, company, position, jobDescription } = req.body;
  
  // Save form data to the database
  try {
    const jobSuggestion = new JobSuggestionModel({
      name,
      company,
      position,
      jobDescription,
    });

    console.log("Saving data:", jobSuggestion);

    // Generate sample suggestions (Replace with actual processing logic)
    jobSuggestion.suggestedCourses = [
      {
        coarsename:"Course A: Advanced React",
        description:"This is coarse A that is advanced React and u will learn "
      },
      {
        coarsename:"Course B: Leadership in Tech",
        description:"This is coarse B that is advanced React and u will learn "
      },
      {
        coarsename:"Course C: Data Structures Mastery",
        description:"This is coarse C that is advanced React and u will learn"
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

async function fetchSuggestions(req, resp) {
  const { id } = req.params;

  try {
    const suggestions = await JobSuggestionModel.findById(id);

    if (suggestions) {
      resp.json({ status: true, data: suggestions });
    } else {
      resp.json({ status: false, message: "Suggestions not found" });
    }
  } catch (error) {
    resp.json({ status: false, message: error.message });
  }
}

module.exports = { doSaveUserSignup, doSaveUserSignin, processForm, fetchSuggestions };

