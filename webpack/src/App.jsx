import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./components";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import InterviewPreparation from "./components/InterviewPreparation";
import Footer from "./components/Footer";
import Loader from "./components/Loader"; // Import Loader component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Hide the loader after 3 seconds
    }, 3000);
  }, []);

  return (
    <>
      {/* Display the loader while the page is loading */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Once loading is done, show the main content */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/toSignIn" element={<SignIn />} />
            <Route path="/toSignUp" element={<SignUp />} />
            <Route path="/toIntrvPrep/:id" element={<InterviewPreparation />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
