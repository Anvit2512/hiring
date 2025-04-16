import React, { useRef } from "react";
import {
  FaUserCheck,
  FaUserFriends,
  FaUserAlt,
  FaUserCircle,
  FaCheckCircle,
  FaMicrophone,
  FaBook,
  FaChartBar,
  FaHeart,
} from "react-icons/fa";
import InterviewsCreated from "./InterviewsCreated";
import StartNowForm from "./StartNowForm";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../redux/authSlice";  // adjust the path based on your project structure
import toast from "react-hot-toast";
export default function Index() {
  let navigate = useNavigate();
  // Create a ref for StartNowForm
  const startNowRef = useRef(null);
  const featuresRef = useRef(null);
  const interviewsRef = useRef(null);

  const handleStartNowClick = () => {
    if (startNowRef.current) {
      startNowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeaturesClick = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInterviewsClick = () => {
    if (interviewsRef.current) {
      interviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearToken());
    toast.success("Signed Out Successfully...");
    navigate("/toSignIn");
  };


  return (
    <>
      <div className="bg-gray-950 text-white min-h-screen p-10">
        {/* Header */}
        {/* <Navbar></Navbar> */}
        <header className="flex justify-between items-center mb-16">
          {/* Logo */}
          <a
            onClick={() => {
              navigate("/");
            }}
          >
            <h1 className="text-5xl font-bold flex cursor-pointer">
              <span className="text-blue-400">U</span>
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                HIRE
              </span>
            </h1>
          </a>

          <nav className="flex-1 flex justify-end space-x-8 text-gray-300 font-semibold text-lg mr-10 cursor-pointer">
            <a
              onClick={() => {
                navigate("/");
              }}
              className="font-semibold bg-gradient-to-r  from-indigo-500 via-indigo-400 to-indigo-300 bg-clip-text text-transparent hover:text-white transition duration-500"
            >
              Home
            </a>
            <a
            onClick={handleFeaturesClick}
              className="font-semibold bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 bg-clip-text text-transparent hover:text-white transition duration-500"
            >
              Features
            </a>
            <a
            onClick={handleInterviewsClick}
              className="font-semibold bg-gradient-to-r  from-purple-500 via-purple-400 to-purple-300 bg-clip-text text-transparent hover:text-white transition duration-500"
            >
              Interviews
            </a>
          </nav>

          <button
            onClick={handleStartNowClick}
            className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 rounded-lg text-lg font-semibold"
          >
            Start Now
          </button>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 ml-2 rounded-lg text-lg font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/toSignIn");
              }}
              className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 ml-2 rounded-lg text-lg font-semibold"
            >
              Sign In
            </button>
          )}

        </header>
        <main className="text-center">
          <div className="bg-gray-900 px-3 py-16 rounded-lg shadow-lg">
            <h2 className="text-5xl font-bold mb-4">
              Your Ultimate Interview Advantage
            </h2>
            <p className="text-lg text-gray-400 mb-12">
              Ace Every Interview Question with Confidence Inside{" "}
              <span className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                Your Job Description
              </span>
            </p>

            <div className="flex flex-col px-5 lg:flex-col justify-center gap-10">
              <div className="flex flex-col lg:flex-row justify-start gap-3">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full lg:w-1/3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Design Patterns
                    </h3>
                    <span className="text-green-400 font-semibold">
                      50% Done
                    </span>
                    <FaUserAlt className="text-yellow-400" size={24} />
                  </div>

                  <ul className="space-y-3">
                    <li className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-800 to-blue-800 p-4 rounded-lg">
                      <span className="text-white font-semibold">Strategy</span>
                      <FaUserCheck className="text-green-400" size={24} />
                    </li>
                    <li className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-600 to-blue-800 p-4 rounded-lg">
                      <span className="text-white font-semibold">Observer</span>
                      <FaUserFriends className="text-orange-400" size={24} />
                    </li>
                    <li className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-600 to-blue-800 p-4 rounded-lg">
                      <span className="text-white font-semibold">
                        Decorator
                      </span>
                      <FaUserAlt className="text-red-400" size={24} />
                    </li>
                    <li className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-600 to-blue-800 p-4 rounded-lg">
                      <span className="text-white font-semibold">Factory</span>
                      <FaUserCheck className="text-green-400" size={24} />
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full lg:w-1/3">
                  <h3 className="text-xl font-semibold mb-6 text-left">
                    Programming Languages
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-800 to-blue-800 p-4 rounded-lg">
                      JavaScript
                    </li>
                    <li className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-800 to-blue-800 p-4 rounded-lg">
                      Python
                    </li>
                    <li className="flex items-center justify-between bg-gradient-to-r from-purple-700 via-purple-800 to-blue-800 p-4 rounded-lg">
                      C#
                    </li>
                  </ul>
                </div>

                <div className="mt-[180px] flex flex-wrap justify-center">
                  <FaCheckCircle className="text-green-400 mr-2" size={30} />
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                    Master Every Topic
                  </h3>

                  <p className="text-white mb-16 font-semibold">
                    Sharpen your answer to every question through our AI-powered
                    interview.
                  </p>
                </div>
              </div>

              {/* ============================================================================= */}
              <div className="flex flex-col lg:flex-row justify-start gap-3 mt-4">
                <div className="mt-[180px] flex flex-wrap justify-center">
                  <FaCheckCircle className="text-green-400 mr-2" size={30} />
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                    Tailored Recomendation
                  </h3>

                  <p className="text-white mb-16 font-semibold">
                    Get expert advice on how to show your expertise in each
                    question effectively.
                  </p>
                </div>

                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg shadow-purple-600 max-w-2xl mx-auto hover:scale-105 transition duration-500 hover:shadow-xl hover:shadow-purple-700 hover:bg-gray-950">
                  {/* Interviewer Section */}
                  <div className="mb-4">
                    <p className="text-left text-sm text-indigo-400 mb-1">
                      Interviewer:
                    </p>
                    <p className="text-base text-left text-gray-400 leading-relaxed">
                      Hello John, thank you for joining us today. Let's dive
                      right into the interview: Can you explain the Singleton
                      design pattern and provide a detailed example of how you
                      used it in a project?
                    </p>
                  </div>

                  {/* Audio Player Section */}
                  <div className="bg-gray-900 p-2 rounded-full flex items-center justify-between mb-4">
                    <audio className="w-full" controls>
                      <source src="#" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Recommendation Section */}
                  <div className=" pt-3">
                    <p className="text-left text-sm text-purple-400 mb-1 ">
                      Recommendation:
                    </p>
                    <p className="text-base text-left leading-relaxed text-indigo-400">
                      Make sure to cover how the Singleton pattern works, its
                      use cases, and a real-world application where you found it
                      useful. Detail the problem you were solving and how the
                      Singleton pattern addressed it.
                    </p>
                  </div>
                </div>
              </div>
              {/* ========================================================================= */}
              <div className="flex flex-col lg:flex-row justify-start gap-3 mb-4 mt-4">
                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg shadow-purple-600 max-w-2xl mx-auto hover:scale-105 transition duration-500 hover:shadow-xl hover:shadow-purple-700 hover:bg-gray-950">
                  {/* Interviewer Section */}
                  <div className="mb-4">
                    <p className="text-left text-sm text-indigo-400 mb-1">
                      You:
                    </p>
                    <p className="text-base text-left text-gray-400 leading-relaxed">
                      I think Singleton is a very useful pattern that we can use
                      in cases the app needs to ensure that only one instance
                      exists in the whole application.
                    </p>
                  </div>

                  {/* Feedback Section */}
                  <div className=" pt-3">
                    <p className="text-left text-sm text-purple-400 mb-1 ">
                      Feedback:
                    </p>
                    <p className="text-base text-left leading-relaxed text-indigo-400">
                      Great start on explaining the Singleton pattern and its
                      importance. Remember, it controls a single instance with a
                      global access point, ideal for use cases like logging or
                      managing configurations. Including examples, like using it
                      for database connections, would strengthen your response
                      and showcase your practical understanding.
                    </p>
                  </div>
                </div>
                <div className="mt-[180px] flex flex-wrap justify-center">
                  <FaCheckCircle className="text-green-400 mr-2" size={30} />
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                    Real Time Feedback
                  </h3>

                  <p className="text-white font-semibold">
                    Get real time feedback to clear and improve your concepts on
                    every topic.
                  </p>
                </div>
              </div>

              <div
              ref={featuresRef} 
              className="bg-gray-900 text-white py-10 mt-6">
                <h2 className="text-center text-2xl font-bold mb-12">Features</h2>
                <div className="container mx-auto flex justify-center space-x-10">
                  {/* Feature Item */}
                  <div className="flex flex-col items-center text-center">
                    <FaMicrophone className="text-purple-400 text-4xl mb-3 hover:scale-125 transition duration-200 hover:text-purple-500" />
                    <h3 className="text-lg font-semibold text-purple-300 ">
                      Talk Freely
                    </h3>
                    <p className="text-sm text-white">
                      Talk freely with the AI and get feedback on your answers
                    </p>
                  </div>

                  {/* Feature Item */}
                  <div className="flex flex-col items-center text-center">
                    <FaBook className="text-purple-400 text-4xl mb-3 hover:scale-125 transition duration-200 hover:text-purple-500" />
                    <h3 className="text-lg font-semibold text-purple-300">
                      Keep a History
                    </h3>
                    <p className="text-sm text-white">
                      Review your interviews to improve your results
                    </p>
                  </div>

                  {/* Feature Item */}
                  <div className="flex flex-col items-center text-center">
                    <FaChartBar className="text-purple-400 text-4xl mb-3 hover:scale-125 transition duration-200 hover:text-purple-500" />
                    <h3 className="text-lg font-semibold text-purple-300">
                      Progress Tracking
                    </h3>
                    <p className="text-sm text-white">
                      Follow the metrics to see your progression
                    </p>
                  </div>

                  {/* Feature Item */}
                  <div className="flex flex-col items-center text-center">
                    <FaHeart className="text-purple-400 text-4xl mb-3 hover:scale-125 transition duration-200 hover:text-purple-500" />
                    <h3 className="text-lg font-semibold text-purple-300">
                      Made with love
                    </h3>
                    <p className="text-sm text-white">
                      Crafted with care to help you achieve your dreams
                    </p>
                  </div>
                </div>
              </div>

              <InterviewsCreated ref={interviewsRef} ></InterviewsCreated>
              <StartNowForm ref={startNowRef} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
