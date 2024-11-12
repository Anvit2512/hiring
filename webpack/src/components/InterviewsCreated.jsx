import React from "react";

const InterviewCard = ({ position, company, candidate }) => {
  return (
    <div className="bg-gray-800 px-6 py-8 rounded-lg shadow-lg text-center">
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">{position}</h3>
      <p className="text-lg font-semibold bg-gradient-to-r  from-indigo-700 via-indigo-300 to-indigo-100 bg-clip-text text-transparent">{company}</p>
      <p className="text-md text-white mt-2">Candidate: {candidate}</p>
      <button className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-full">
        Go to Dashboard
      </button>
    </div>
  );
};

const InterviewsCreated = () => {
  const interviews = [
    { position: "Software Engineer", company: "Microsoft", candidate: "John Doe" },
    { position: "Tech Art", company: "Blizzard", candidate: "Kraod" },
    { position: "Copywriter", company: "Ralph Lauren", candidate: "Michael Johnson" },
    { position: "Full Stack Engineer", company: "Spotify", candidate: "John Doe" },
    { position: "Software Engineer", company: "Microsoft", candidate: "John Doe" },
    { position: "Software Engineer", company: "Microsoft", candidate: "John Doe" },
    { position: "Software Engineer", company: "Microsoft", candidate: "John Doe" },
  ];

  return (
    <div className="bg-gray-900 min-h-fit p-6 mb-12">
      <h2 className="text-center text-2xl font-bold mb-8">Interviews Created</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {interviews.map((interview, index) => (
          <InterviewCard
            key={index}
            position={interview.position}
            company={interview.company}
            candidate={interview.candidate}
          />
        ))}
      </div>
    </div>
  );
};

export default InterviewsCreated;
