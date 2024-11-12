import React from "react";
import { useNavigate } from "react-router-dom";

const StartNowForm = () => {
  let navigate=useNavigate();
  return (
    <>
    <div className="flex justify-center">
    <div className="bg-gray-900 w-[1000px] min-h-screen border border-purple-500 rounded-lg  shadow-md shadow-purple-700 ">
        <h2 className="text-4xl mt-6">
      <span className="bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
      Start Now
      </span>
    </h2>
      <h2 className="text-center text-4xl bg-gradient-to-r  from-pink-800 via-green-500 to-indigo-300 bg-clip-text text-transparent mt-4"></h2>
      
        <form className="space-y-4  p-10">
          <div>
            <label className="block text-white text-md mb-1">Your Name</label>
            <input
              type="text"
              className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-white text-md mb-1">Company</label>
            <input
              type="text"
              className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-white text-md mb-1">Position</label>
            <input
              type="text"
              className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block  text-white text-md mb-1">Job Description</label>
            <textarea
              className=" w-[900px] h-[400px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white resize-y"
              placeholder="Enter job description here"
            />
          </div>

          <button
            type="button"
            onClick={()=>navigate("/toIntrvPrep")}
            className=" w-[900px] bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded mt-4"
          >
            Start Now
          </button>
        </form>
    </div>
    </div>
    </>
  );
};

export default StartNowForm;
