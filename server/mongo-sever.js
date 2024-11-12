const express=require("express");
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const {dburl}=require('./config/dbconfig');
const Router=require('./routers/URouter');
var bodyparser=require("body-parser");
var fileUploader=require("express-fileupload");
const dotenv=require("dotenv");
app.listen(2005,function(){

    console.log("Server Started!!! at 2005");
});
app.use(cors());
app.use(bodyparser.json());//for parsing POST data coming from Client
// app.use("/uploads",express.static("uploads"));
// For JSON web token =======
dotenv.config();  // TO ADD VARIABLES IN .env FILE IN process.env object. 
//==========================
const server=dburl;
mongoose.connect(server).then(()=>{
    console.log("Server Started Successfully...");
}).catch(function(err){
    console.log(err);
});

app.use(express.urlencoded(true));
app.use(fileUploader());

app.use("/signup",Router);
app.use("/signin",Router);