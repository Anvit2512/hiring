const mongoose=require('mongoose');

function getSignupModel()
{
let ModelSignup=new mongoose.Schema( // Schema is like creating a table 
    {  
    email:{type:String,required:true,unique:true}, // required and unique are used for primary key
    pass:{type:String,required:true,unique:true},
},
{
    versionKey:false, // To avoid __v field in table that is created as Default
}
)
                            //Name of the collection   m  //Schema refrence
                                  //to be created 
    const SignModel=mongoose.model("usersignup",ModelSignup);
    return SignModel;
}



module.exports={getSignupModel}; 
