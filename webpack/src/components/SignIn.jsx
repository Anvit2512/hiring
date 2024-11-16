import React from 'react';
import axios from "axios";
import googlepic from "../assets/googlepic.png"
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../services/axios-config';
import { useState } from "react";
import Navbar from './Navbar';
import DashNavbar from './DashNavbar';

const SignIn = () => {
  let navigate=useNavigate();
  const [obj,setObj]=useState({
    email:"",                          
    pass:""
})
function doUpdate(event) 
{
    const {name,value}=event.target;
    setObj({...obj,[name]:value});
}


async function doSignIn() {
  // Check if email or password is empty
  if (obj.email.trim() === "" || obj.pass.trim() === "") {
    alert("Please fill the email and password");
    return;
  }

  const url = `${baseURL}/signin/user-signin`;
  try {
    const serverMsg = await axios.post(url, obj);
    console.log(serverMsg.data);

    if (serverMsg.data.status === true) {
      alert("SignIn Successfully...");
      navigate("/");
    } else {
      // Handle specific error messages
      if (serverMsg.data.msg === "Incorrect Email or Password") {
        alert("Incorrect Email or Password");
      } else if (serverMsg.data.msg === "There is No Account Registered with this Email Address") {
        alert("There is No Account Registered with this Email Address");
      } else {
        alert(serverMsg.data.msg || "An unknown error occurred");
      }
    }
  } catch (error) {
    console.error("Error signing in:", error);
    alert("An error occurred. Please try again later.");
  }
}


  return (
    <>
     <div className="bg-gray-900 text-white min-h-screen p-10">
    <DashNavbar></DashNavbar>

    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-900 p-8 rounded-lg mb-[150px] w-[400px]">
        {/* Sign in with Google button */}
        <button className="flex items-center justify-center w-full py-2 bg-gray-900 text-white rounded-md border border-gray-600 hover:bg-gray-600 transition duration-200 mb-6">
          <img
            src={googlepic}
            alt="Google logo"
            className="w-7 h-7 mr-2"
          />
          Sign in with Google
        </button>

        {/* Divider with "OR" text */}
        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-gray-600" />
          <span className="text-gray-400 px-2 text-sm">OR</span>
          <hr className="w-full border-gray-600" />
        </div>


        {/* Email input field */}
        <div>
        <TEInput
                id='email'
                name='email'
                type="email"
                onChange={doUpdate}
                label="Email address"
                size="lg"
                className="mb-6 text-white"
              ></TEInput>
        </div>
        <div>
        <TEInput
                id='pass'
                name='pass'
                type="password"
                onChange={doUpdate}
                label="Password"
                size="lg"
                className="mb-4 text-white"
              ></TEInput>
        </div>

        {/* Send magic link button */}
        <button
        onClick={doSignIn} 
        className="w-full py-2 mt-4 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-200 transition duration-200">
          Sign In
        </button>

        {/* Footer text */}
        <div className="mt-6 ml-4 text-center text-sm text-gray-200">
          Don't have an account yet?{' '}
          <a onClick={()=>{navigate("/toSignUp")}} className="text-indigo-700 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default SignIn;
