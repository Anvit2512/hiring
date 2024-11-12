const express=require('express');
const {doSaveUserSignup,doSaveUserSignin}=require('../controller/UController')
// const validateTokenWithNext=require("../auth/validate-token-with-next");
const app=express.Router();

app.post("/user-signup",doSaveUserSignup);
app.post("/user-signin",doSaveUserSignin);

// app.post("/user-login",doSaveUserLogin);

module.exports=app;
