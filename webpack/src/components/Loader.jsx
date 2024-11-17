import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      {" "}
      {/* You can customize the background */}
      <div className="text-5xl font-bold flex">
        <span className="inline-block animate-wave animate-colorCycle delay-0 text-blue-400">
          U
        </span>
        <span className="inline-block animate-wave animate-colorCycle delay-100 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
          HIRE
        </span>
        {/* <span className="inline-block animate-wave animate-colorCycle delay-200">
          I
        </span>
        <span className="inline-block animate-wave animate-colorCycle delay-300">
          R
        </span>
        <span className="inline-block animate-wave animate-colorCycle delay-400">
          E
        </span> */}
      </div>
    </div>
  );
};

export default Loader;
