import React from "react";
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import axios from "axios";
import { baseURL } from '../services/axios-config';
import { useState } from "react";
import Navbar from "./Navbar";
import DashNavbar from "./DashNavbar";
import toast from "react-hot-toast";

export default function SignUp() {
  let navigate = useNavigate();
  const [obj, setObj] = useState({
    email: "",
    pass: "",
  });

  function doUpdate(event) {
    const { name, value } = event.target;
    setObj({ ...obj, [name]: value });
  }

  async function doSignup() {
    // Check if email or password is empty
    if (obj.email.trim() === "" || obj.pass.trim() === "") {
      toast.error("Please fill the email and password");
      return;
    }

    const url = `${baseURL}/signup/user-signup`;
    try {
      const serverMsg = await axios.post(url, obj);

      if (serverMsg.data.status === true) {
        toast.success("Signed up successfully!");
        navigate("/toSignIn");
      } else {
        // Check if the error message indicates an existing email
        if (
          serverMsg.data.err &&
          serverMsg.data.err.includes("E11000 duplicate key error collection")
        ) {
          toast.error(
            "There is already an Account with this Email ID, Please Sign In"
          );
        } else {
          toast.error(serverMsg.data.err);
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
      //alert("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen p-10">
        <DashNavbar />

        <section className="mt-1">
          <div className="container h-full px-6 py-14">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              {/* Left column container with background */}
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="Phone image"
                />
              </div>

              {/* Right column container with form */}
              <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                <form>
                  {/* Email input */}
                  <TEInput
                    id="email"
                    name="email"
                    type="email"
                    onChange={doUpdate}
                    label="Email address"
                    size="lg"
                    className="mb-6 text-white"
                  />

                  {/* Password input */}
                  <TEInput
                    id="pass"
                    name="pass"
                    type="password"
                    onChange={doUpdate}
                    label="Password"
                    className="mb-6 text-white"
                    size="lg"
                  />

                  {/* Submit button */}
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
                    Have an account?{" "}
                    <a
                      onClick={() => {
                        navigate("/toSignIn");
                      }}
                      className="text-indigo-700 hover:underline"
                    >
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
