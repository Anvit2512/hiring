const express = require("express");
const { doSaveUserSignup, doSaveUserSignin, doGoogleLogin, processForm, fetchSuggestions, getSuggestionsById } = require("../controller/UController");

const app = express.Router();

app.post("/user-signup", doSaveUserSignup);
app.post("/user-signin", doSaveUserSignin);

// New Routes
app.post("/process-form", processForm);
app.get("/suggestions/:id", fetchSuggestions);
app.get("/suggestionss/:id", getSuggestionsById);
app.post("/google-signin", doGoogleLogin);

module.exports = app;
