import React from "react";
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import axios from "axios";
import { baseURL } from '../services/axios-config';
import { useState } from "react";

export default function SignUp(){
    let navigate=useNavigate();
    console.log("rendered");
    const [obj,setObj]=useState({
        email:"",
        pass:"",
    });
    

    function doUpdate(event)
    {
      console.log(name);
      console.log(value);
        var { name, value } = event.target;

        setObj({ ...obj,[name]: value});
    }
    async function doSignup()
    {
       const url = `${baseURL}/signup/user-signup`;
      const serverMsg= await axios.post(url,obj);
      
      //  console.log(serverMsg)
     //   alert(JSON.stringify(serverMsg));
        if(serverMsg.data.status==true)
        {
          alert("Signedup Successfullyyyyy");
        }
           
        else    
        {
          alert(serverMsg.data.err);
        }
            
          
    }
  return (
    <>
     <div className="bg-gray-900 text-white min-h-screen p-10">
     <header className="flex justify-between items-center">
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


    <section className="mt-1">
      <div className="container h-full px-6 py-14">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form>
              {/* <!-- Email input --> */}
              <TEInput
              id="email"
              name="email"
                type="email"
                onChange={doUpdate}
                label="Email address"
                size="lg"
                className="mb-6 text-white"
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
              id="pass"
              name="pass"
              onChange={doUpdate}
                type="password"
                label="Password"
                className="mb-6 text-white"
                size="lg"
              ></TEInput>


              {/* <!-- Submit button --> */}

              <TERipple rippleColor="light" className="w-full">
                <button
                  type="button"
                  onClick={doSignup}
                  className="inline-block w-full rounded bg-purple-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#8f32ed] transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-[0_8px_9px_-4px_rgba(144, 50, 237,0.3),0_4px_18px_0_rgba(144, 50, 237,0.2)] focus:bg-purple-700 focus:shadow-[0_8px_9px_-4px_rgba(144, 50, 237,0.3),0_4px_18px_0_rgba(144, 50, 237,0.2)] focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-[0_8px_9px_-4px_rgba(144, 50, 237,0.3),0_4px_18px_0_rgba(144, 50, 237,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(144, 50, 237,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(144, 50, 237,0.2),0_4px_18px_0_rgba(144, 50, 237,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(144, 50, 237,0.2),0_4px_18px_0_rgba(144, 50, 237,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(144, 50, 237,0.2),0_4px_18px_0_rgba(144, 50, 237,0.1)]"
                >
                  Sign up
                </button>
              </TERipple>
              <div className="mt-6 ml-4 text-center text-sm text-gray-200">
          Have an account ?{' '}
          <a onClick={()=>{navigate("/toSignIn")}} className="text-indigo-700 hover:underline">
            Sign In
          </a>
        </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </div>
    </>
  );
}