import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../services/axios-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

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
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {suggestion}
                </h3>
                <span
                  className="font-semibold text-[#a3ff00]"
                  style={{ color: "#a3ff00" }}
                >
                  50% Done
                </span>
                <FontAwesomeIcon
                  icon={faCircleRight}
                  className="text-green-400 hover:scale-110 hover:text-green-500 transition-transform duration-300 cursor-pointer"
                  size="2xl"
                />
              </div>
              <div
                className="flex-grow bg-gradient-to-r from-purple-700 via-purple-800 to-blue-800 rounded-lg p-4 overflow-hidden"
                style={{ height: "auto" }}
              >
                <p className="text-lg text-white">{suggestion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparation;
