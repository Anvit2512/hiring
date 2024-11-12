var bodyparser=require("body-parser");
const path=require('path');
const express=require("express");
const app=express();
var fileupload=require('express-fileupload');
app.use(fileupload());
var bodyparser=require("body-parser");
const {getSignupModel}=require('../model/SignupModel');


const SignModel=getSignupModel();
// FOR JSON WEB TOKEN ============
// const dotenv=require("dotenv");
// const jwt=require("jsonwebtoken");
//================================

function doSaveUserSignup(req,resp)
{
    //console.log(req.body)
    const doc=new SignModel(req.body);
      doc.save().then((retDoc)=>{
              resp.set("json");
              resp.json({status:true, rec:retDoc});//retDoc is an object
      }).catch((err)=>{
          resp.json({status:false,err:err.message,req:req.body});//retDoc is an object
      })  
}

function doSaveUserSignin(req,resp)
{
   // console.log(req.body);
    const {email,pass}=req.body;
    SignModel.findOne({email:email,pass:pass}).then((retDoc)=>{
       // console.log(retDoc);
      
        if(retDoc!=null)
        {
            // CREATION OF WEB TOKEN
    //    let skey=process.env.SEC_KEY;
    //    let token=jwt.sign({retDoc},skey,{expiresIn:"1h"}); // Need both retDoc and skey to create token
            resp.json({status:true,msg:retDoc});
        }
        else {
            resp.json({status:true,msg:"Login Failed Try Again!"});
        }
    }).catch((err)=>{
        resp.json({status:false,err:err.message});
    })
}

module.exports={doSaveUserSignup,doSaveUserSignin};
