import React from 'react';
import axios from "axios";
import googlepic from "../assets/googlepic.png"
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../services/axios-config';
import { useState } from "react";

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

async function doSignIn()
{
    const url=`${baseURL}/signin/user-signin`;
    const serverMsg=await axios.post(url,obj);
    console.log(serverMsg.data);
    if(serverMsg.data.status===true)
    {
      alert("SignIn Successfully...");
        navigate("/");
    }
    else {
        alert(serverMsg.data.message);
    }
}
  return (
    <>
     <div className="bg-gray-900 text-white min-h-screen p-10">
     <header className="flex justify-between items-center mb-16">
        {/* Logo */}
        <a onClick={()=>{navigate("/")}}>
        <h1 className="text-5xl font-bold flex">
      <span className="text-blue-400">U</span>
      <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
        HIRE
      </span>
    </h1>
</a>
        
        <nav className="flex-1 flex justify-end space-x-8 text-gray-300 font-semibold text-lg mr-10">
          <a onClick={()=>{navigate("/")}} className="font-semibold bg-gradient-to-r  from-indigo-500 via-indigo-400 to-indigo-300 bg-clip-text text-transparent hover:text-white transition duration-500">Home</a>
          <a href="#" className="font-semibold bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 bg-clip-text text-transparent hover:text-white transition duration-500">Features</a>
          <a href="#" className="font-semibold bg-gradient-to-r  from-purple-500 via-purple-400 to-purple-300 bg-clip-text text-transparent hover:text-white transition duration-500">Interviews</a>
        </nav>

      
        <button className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 rounded-lg text-lg font-semibold">
          Start Now
        </button>
        <button className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 ml-2 rounded-lg text-lg font-semibold"
            onClick={()=>{navigate("/toSignIn")}}
        >
          Sign In
        </button> 
      </header>
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
        onChange={doSignIn} 
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
