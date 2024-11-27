import React from "react";
import DashNavbar from "./DashNavbar";
import mic from "../assets/mic.png"

const InterviewPractice= () => {
  return (
    <>
     <div className="bg-gray-950 text-white min-h-screen p-10">
        <DashNavbar></DashNavbar>
    <div className="min-h-screen w-[1100px] m-auto bg-gray-900 rounded-lg p-10">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-4xl mb-8 text-left bg-gradient-to-r from-blue-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">Interview Preparation</h1>
        <h2 className="text-4xl font-bold text-white">Programming Languages: <span className="text-purple-300">TypeScript</span></h2>
        <p className="mt-1 text-gray-400">
          Interviewer: <span className="text-purple-500 font-semibold">Eve Thompson</span> | Engineering Team Lead
        </p>
      </div>

      {/* Interview Section */}
      <div className="bg-gray-900 w-full max-w-4xl rounded-lg p-6 shadow-md border border-white hover:shadow-xl hover:shadow-purple-700 hover:bg-gray-950">
        {/* Question Section */}
        <div className="mb-6">
          <p className="text-lg text-gray-300">
            <span className="text-purple-500 font-semibold">Interviewer:</span> Hi John, thank you for being here today. Let's start with a question about TypeScript. Can you describe a situation where you used TypeScript to improve the maintainability or performance of an application? Please be detailed in your explanation.
          </p>
          {/* Audio Player */}
          <div className="flex items-center gap-3 mt-4">
            <div className="bg-gray-700 w-64 h-2 rounded-lg overflow-hidden">
              <div className="bg-purple-500 h-2 w-16"></div>
            </div>
            <p className="text-gray-400 text-sm">0:02 / 0:18</p>
            <button className="bg-gray-700 hover:bg-purple-500 text-white px-3 py-1 rounded-lg text-sm transition">
              Play
            </button>
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-purple-400 font-semibold">Recommendation</p>
          <p className="text-sm text-gray-300 mt-2">
            Focus on specifics: What was the project? What challenges were you facing? How did you implement TypeScript, and what were the tangible results?
          </p>
        </div>
      </div>
        {/* Answer Section */}
        <div className="bg-gray-800 w-full max-w-4xl rounded-lg m-auto mt-12 p-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Answer</h3>
          <div className="flex items-center gap-4">
            {/* Microphone Button */}
            <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4">
              <img src={mic} alt="" className="h-[40px]" />
            </button>
            <input
              type="text"
              name="name"
              placeholder="Start speaking to see the text here."
              className="w-full bg-gray-700 italic text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-double focus:border-white"
            />
            {/* <p className="text-gray-500 italic">Start speaking to see the text here.</p> */}
          </div>
          {/* Switch to Text Button */}
          <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-lg mt-4">
            Switch to Text
          </button>
        </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default InterviewPractice;
