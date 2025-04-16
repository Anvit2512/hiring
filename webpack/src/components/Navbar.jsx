import React from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
export default function Navbar() {
  let navigate=useNavigate();
  return(
    <>

{/* Header */}
<header className="flex justify-between items-center mb-16">
  {/* Logo */}
  <a onClick={()=>{navigate("/")}} className="cursor-pointer">
  <h1 className="text-5xl font-bold flex cursor-pointer">
<span className="text-blue-400">U</span>
<span className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
  HIRE
</span>
</h1>
</a>
  
  <nav className="flex-1 flex justify-end space-x-8 text-gray-300 font-semibold text-lg mr-10 cursor-pointer">
    <a onClick={()=>{navigate("/")}} className="font-semibold bg-gradient-to-r  from-indigo-500 via-indigo-400 to-indigo-300 bg-clip-text text-transparent hover:text-white transition duration-500">Home</a>
    <a href="#" className="font-semibold bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 bg-clip-text text-transparent hover:text-white transition duration-500">Features</a>
    <a href="#" className="font-semibold bg-gradient-to-r  from-purple-500 via-purple-400 to-purple-300 bg-clip-text text-transparent hover:text-white transition duration-500">Interviews</a>
  </nav>


  <button className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 rounded-lg text-lg font-semibold">
    Start Now
  </button>
  <button className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 ml-2 rounded-lg text-lg font-semibold"
      onClick={()=>{navigate("/toSignIn")}}
  >
    Sign In
  </button> 
</header>
</> 
  )
    
}
