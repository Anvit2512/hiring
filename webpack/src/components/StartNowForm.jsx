import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../services/axios-config";

const StartNowForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    jobDescription: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Updating form data:", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${baseURL}/api/process-form`;

    console.log("Submitting form data:", formData);

    try {
      const response = await axios.post(url, formData);
      console.log("Data sent successfully:", response.data);

      if (response.data.status) {
        const id = response.data.data._id; // Assuming backend returns the saved document with an _id
        navigate(`/toIntrvPrep/${id}`); // Pass the ID to the route
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div ref={ref} className="flex justify-center">
      <div className="bg-gray-900 w-[1000px] min-h-screen border border-purple-500 rounded-lg shadow-md shadow-purple-700">
        <h2 className="text-4xl mt-6 text-center">
          <span className="bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Start Now
          </span>
        </h2>

        <form className="space-y-4 p-10" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white text-md mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-white text-md mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-white text-md mb-1">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-white text-md mb-1">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="w-[900px] h-[400px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white resize-y"
              placeholder="Enter job description here"
            />
          </div>

          <button
            type="submit"
            className="w-[900px] bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded mt-4"
          >
            Start Now
          </button>
        </form>
      </div>
    </div>
  );
});

export default StartNowForm;
