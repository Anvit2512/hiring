import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../services/axios-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import DashNavbar from "./DashNavbar";

const InterviewPreparation = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("Fetching suggestions for ID:", id);
    const fetchSuggestions = async () => {
      const url = `${baseURL}/api/suggestions/${id}`;
      try {
        const response = await axios.get(url);
        console.log("Fetched suggestions:", response.data);
        if (response.data.status) {
          setSuggestions(response.data.data.suggestedCourses);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [id]);

  return (
    <div className="bg-gray-950 text-white min-h-screen p-10">
      <DashNavbar />
      <div className="min-h-screen w-[1300px] ml-[60px] bg-gray-900 rounded-lg p-8">
        <h2 className="text-4xl mb-8 text-center bg-gradient-to-r from-blue-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">
          Interview Preparation
        </h2>
        <div className="flex justify-around mb-6 text-center">
          <div>
            <p className="text-xl">Completed</p>
            <p className="text-2xl font-bold text-purple-400">0%</p>
          </div>
          <div>
            <p className="text-xl">Success Rate</p>
            <p className="text-2xl font-bold text-purple-400">0%</p>
          </div>
          <div>
            <p className="text-xl">Training Sessions</p>
            <p className="text-2xl font-bold text-purple-400">0</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {suggestion.coarsename}
                </h3>
                <span className="font-semibold" style={{ color: "#a3ff00" }}>
                  50% Done
                </span>
                {/* Tooltip Implementation */}
                <div className="relative group">
  <FontAwesomeIcon
    icon={faCircleRight}
    className="text-green-400 hover:text-green-600 cursor-pointer"
    size="2xl"
    beat
  />
  <div
    className="absolute bottom-full mb-3 left-1/2 transform -translate-x-[50%] hidden group-hover:block bg-white text-black text-sm rounded-lg px-3 py-2 whitespace-nowrap transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
  >
    Start Now
  </div>
</div>


              </div>
              <div
                className="flex-grow bg-gradient-to-r from-purple-700 via-purple-800 to-blue-800 rounded-lg p-4"
                style={{ height: "auto" }}
              >
                <p className="text-lg text-white" style={{ wordBreak: "break-all" }}>
                  {suggestion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparation;
