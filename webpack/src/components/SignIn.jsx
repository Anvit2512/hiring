import React from 'react';
import axios from "axios";
import googlepic from "../assets/googlepic.png"
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../services/axios-config';
import { useState } from "react";
import DashNavbar from './DashNavbar';
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice"; // adjust the path if needed
import { toast } from "react-hot-toast"
import { GoogleLogin } from '@react-oauth/google';



const SignIn = () => {

  const dispatch = useDispatch();

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
    if (obj.email.trim() === "" || obj.pass.trim() === "") {
      toast.error("Please fill the email and password");
      return;
    }

    const url = `${baseURL}/signin/user-signin`;
    try {
      const serverMsg = await axios.post(url, obj);
      console.log(serverMsg.data);

      if (serverMsg.data.status === true) {
        const token = serverMsg.data.token;
        if (token) {
          dispatch(setToken(token)); //  Use Redux to set token
          console.log("Token dispatched:", token);
        }

        //alert("SignIn Successfully...");
        toast.success("SignIn Successfully...");
        navigate("/");
      } else {
        if (serverMsg.data.msg === "Incorrect Email or Password") {
          //alert("Incorrect Email or Password");
          toast.error("Passwords Do Not Match")
        } else if (serverMsg.data.msg === "There is No Account Registered with this Email Address") {
          //alert("There is No Account Registered with this Email Address");
          toast.error("There is No Account Registered with this Email Address")
        } else {
          //alert(serverMsg.data.msg || "An unknown error occurred");
          toast.error(serverMsg.data.msg || "An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      //alert("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
  
      // Send this credential (JWT) to your backend to verify
      const response = await axios.post(`${baseURL}/signin/google-signin`, {
        token: credential,
      });
  
      if (response.data.status === true) {
        const token = response.data.token;
        dispatch(setToken(token)); 
        toast.success("Google Sign-In Successful!");
        navigate("/");
      } else {
        console.error(response.data.msg);
        toast.error(response.data.msg || "Google Sign-In Failed!");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      toast.error("An error occurred during Google Sign-In");
    }
  };
  
  return (
    <>
     <div className="bg-gray-950 text-white min-h-screen p-10">
    <DashNavbar></DashNavbar>

    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-900 p-8 rounded-lg mb-[150px] w-[400px]">
        {/* Sign in with Google button */}
        
          <GoogleLogin className="bg-gray-900"
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
              toast.error("Google Sign-In Failed!");
            }}
            theme="outline"
            size="large"
            shape='pill'
            logo_alignment="left"
            ux_mode="popup"
            width="337px"
          />
      


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
