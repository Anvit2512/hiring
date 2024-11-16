import React from "react";
import { useNavigate } from 'react-router-dom'
export default function DashNavbar() {
  let navigate=useNavigate();
  return(
    <>

{/* Header */}
<header className="flex justify-between items-center mb-16">
  {/* Logo */}
  <a onClick={()=>{navigate("/")}}>
  <h1 className="text-5xl font-bold flex">
<span className="text-blue-400">U</span>
<span className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
  HIRE
</span>
</h1>
</a>

  <button className="bg-purple-600 hover:bg-purple-900 transition duration-500 text-white px-6 py-2 ml-2 rounded-lg text-lg font-semibold"
      onClick={()=>{navigate("/")}}
  >
    Dashboard
  </button> 
</header>
</> 
  )
    
}
