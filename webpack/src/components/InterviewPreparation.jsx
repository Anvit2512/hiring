import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from '../services/axios-config';
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
const InterviewPreparation = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { id } = useParams(); // Retrieve ID from route params

  useEffect(() => {
    console.log("Fetching suggestions for ID:", id);
    const fetchSuggestions = async () => {
    const url = `${baseURL}/api/suggestions/${id}`;
      try {
        const response = await axios.get(url);
        console.log("Fetched suggestions:", response.data);
        if (response.data.status) {
          setSuggestions(response.data.data.suggestedCourses); // Assuming backend returns suggestedCourses
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [id]);

  return (
    <div className="bg-gray-950 text-white min-h-screen p-10">
      <Navbar />
      <div className="min-h-screen w-[1300px] ml-[60px] bg-gray-900 rounded-lg p-8">
        <h2 className="text-4xl mb-8 text-center bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Interview Preparation
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {suggestions.map((suggestion, index) => (
            // <div
            //   key={index}
            //   className="bg-gray-800 p-4 rounded-lg text-white"
            // >
            //   <h3 className="text-xl font-bold">{suggestion}</h3>
            // </div>
            <div
            key={index} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {suggestion}
                    </h3>
                    <span className="text-green-400 font-semibold">
                      50% Done
                    </span>
                    <FaUserAlt className="text-yellow-400" size={24} />
                  </div>
                <div className=" h-[100px] overflow-hidden bg-gradient-to-r from-purple-700 via-purple-800 to-blue-800 rounded-lg">
              <p className="text-xl font-semibold text-white"></p>
                </div>
                 
                </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparation;
