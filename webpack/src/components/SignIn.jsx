import React from 'react';
import axios from "axios";
import googlepic from "../assets/googlepic.png"
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../services/axios-config';
import { useState } from "react";
import Navbar from './Navbar';

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

function Success()
{
  alert("Yes");
  <div class="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30" role="alert" tabindex="-1" aria-labelledby="hs-bordered-success-style-label">
  <div class="flex">
    <div class="shrink-0">
   
      <span class="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </span>
   
    </div>
    <div class="ms-3">
      <h3 id="hs-bordered-success-style-label" class="text-gray-800 font-semibold dark:text-white">
        SignedIn Successfully.
      </h3>
      <p class="text-sm text-gray-700 dark:text-neutral-400">
        You have successfully SignedIn...
      </p>
    </div>
  </div>
</div>
}

async function doSignIn()
{
    const url=`${baseURL}/signin/user-signin`;
    const serverMsg=await axios.post(url,obj);
    console.log(serverMsg.data);
    if(serverMsg.data.status===true)
    {
      if(serverMsg.data.msg=="Login Failed Try Again!")
      alert(serverMsg.data.msg);
    else
    {
      alert("SignIn Successfully...")
      navigate("/");
    }
        
    }
    else {
        alert(serverMsg.data.message);
        return;
    }
}
  return (
    <>
     <div className="bg-gray-900 text-white min-h-screen p-10">
    <Navbar></Navbar>

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
