import React from 'react';
import Navbar from "./Navbar"

const Card = ({ children, className }) => (
  <div className={`rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-semibold ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

const UserIcon = () => (
  <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center text-gray-800">
    <span className="text-xs">👤</span> 
  </div>
);
     
const InterviewPreparation= () => {
  return (
    <>
    <div className="bg-gray-950 text-white min-h-screen p-10">
    <Navbar></Navbar>
    <div className="min-h-screen w-[1300px] ml-[60px] bg-gray-900 rounded-lg p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Stats */}
        <div className="mb-8">
        <h2 className="text-4xl mb-8">
      <span className="bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
      Interview Preparation
      </span>
    </h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-purple-500 text-3xl font-bold">0%</div>
              <div className="text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-purple-500 text-3xl font-bold">0%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-purple-500 text-3xl font-bold">0</div>
              <div className="text-gray-400">Training Sessions</div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* VFX Section */}
          <Card className="bg-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">VFX (Visual Effects)</CardTitle>
                <span className="text-teal-400 text-sm">0% Done</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Real-time VFX creation',
                'Stylized FX textures painting',
                'Technical setup and integration in game engines',
                'Troubleshooting VFX in real-time'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-600 rounded-lg p-3 text-white">
                  <span>{item}</span>
                  <UserIcon />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Software Proficiency */}
          <Card className="bg-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Software Proficiency</CardTitle>
                <span className="text-teal-400 text-sm">0% Done</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Photoshop',
                'Maya',
                'Node-Based Shader Tools'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-600 rounded-lg p-3 text-white">
                  <span>{item}</span>
                  <UserIcon />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Game Development */}
          <Card className="bg-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Game Development</CardTitle>
                <span className="text-teal-400 text-sm">0% Done</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Experience crafting VFX for PC, Console, or Mobile Games',
                'Previously shipped a title for PC, Console, or Mobile'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-600 rounded-lg p-3 text-white">
                  <span>{item}</span>
                  <UserIcon />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Professional Skills */}
          <Card className="bg-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Professional Skills</CardTitle>
                <span className="text-teal-400 text-sm">0% Done</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Excellent communication',
                'Team collaboration'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-600 rounded-lg p-3 text-white">
                  <span>{item}</span>
                  <UserIcon />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default InterviewPreparation;