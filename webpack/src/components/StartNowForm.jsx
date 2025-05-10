// import React, { forwardRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { baseURL } from "../services/axios-config";

// const StartNowForm = forwardRef((props, ref) => {
//   // Form state management
//   const [formData, setFormData] = useState({
//     name: "",
//     company: "",
//     position: "",
//     jobDescription: "",
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input change
//   };

//   // Validate form fields
//   const validateForm = () => {
//     const validationErrors = {};
//     if (!formData.name.trim()) validationErrors.name = "Name is required.";
//     if (!formData.company.trim()) validationErrors.company = "Company is required.";
//     if (!formData.position.trim()) validationErrors.position = "Position is required.";
//     if (!formData.jobDescription.trim())
//       validationErrors.jobDescription = "Job Description is required.";
//     return validationErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const url = `${baseURL}/api/process-form`;

//     try {
//       const response = await axios.post(url, formData);
//       console.log("Data sent successfully:", response.data);

//       if (response.data.status) {
//         const id = response.data.data._id; // Assuming backend returns the saved document with an _id
//         navigate(`/toIntrvPrep/${id}`); // Pass the ID to the route
//       }
//     } catch (error) {
//       console.error("Error sending data:", error);
//       setErrors({ submit: "Failed to send the form. Please try again." });
//     }
//   };

//   return (
//     <div ref={ref} className="flex justify-center">
//       <div className="bg-gray-900 w-[1000px] min-h-screen border border-purple-500 rounded-lg shadow-md shadow-purple-700 p-8">
//         <h2 className="text-4xl mt-4 text-center">
//           <span className="bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Start Now
//           </span>
//         </h2>

//         <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
//           {/* Name Field */}
//           <div>
//             <label className="block text-white text-md mb-1">Your Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           {/* Company Field */}
//           <div>
//             <label className="block text-white text-md mb-1">Company</label>
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//               className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
//             />
//             {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
//           </div>

//           {/* Position Field */}
//           <div>
//             <label className="block text-white text-md mb-1">Position</label>
//             <input
//               type="text"
//               name="position"
//               value={formData.position}
//               onChange={handleChange}
//               className="lg:min-w-[300px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white"
//             />
//             {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
//           </div>

//           {/* Job Description Field */}
//           <div>
//             <label className="block text-white text-md mb-1">Job Description</label>
//             <textarea
//               name="jobDescription"
//               value={formData.jobDescription}
//               onChange={handleChange}
//              className="w-[900px] h-[400px] bg-gray-800 text-white border border-gray-600 rounded py-2 px-4 outline-none focus:border-white resize-y"
//               placeholder="Enter job description here"
//             />
//             {errors.jobDescription && (
//               <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//              className="w-[900px] bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded mt-4"
//           >
//             Start Now
//           </button>

//           {/* Error Message */}
//           {errors.submit && (
//             <p className="text-red-500 text-sm mt-4 text-center">{errors.submit}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// });

// export default StartNowForm;

import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../services/axios-config";

const StartNowForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    username: "",
    company: "",
    position: "",
    job_description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Updating form data:", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/handle/recommend-skills`;

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
              name="username"
              value={formData.username}
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
              name="job_description"
              value={formData.job_description}
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
