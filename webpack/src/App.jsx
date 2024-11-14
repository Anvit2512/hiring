import React from "react"
import { Route,Routes} from "react-router-dom";
import Index from "./components";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import InterviewPreparation from "./components/InterviewPreparation";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Index></Index>}></Route>
      <Route path='/toSignIn' element={<SignIn></SignIn>}></Route>
      <Route path='/toSignUp' element={<SignUp></SignUp>}></Route>
      <Route path='/toIntrvPrep' element={<InterviewPreparation></InterviewPreparation>}></Route>
      
      </Routes>
    </>
  )
}

export default App
