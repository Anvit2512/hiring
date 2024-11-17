const express = require("express");
const { doSaveUserSignup, doSaveUserSignin, processForm, fetchSuggestions } = require("../controller/UController");

const app = express.Router();

app.post("/user-signup", doSaveUserSignup);
app.post("/user-signin", doSaveUserSignin);

// New Routes
app.post("/process-form", processForm);
app.get("/suggestions/:id", fetchSuggestions);

module.exports = app;
