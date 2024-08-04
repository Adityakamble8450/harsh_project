import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXYR46MLdS3eVnEW0DQev50bmejn_SQxiirw&s')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 font-customfont">Task Management Web Application</h1>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/register">
            <button className="bg-green-500 font-customfont hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-blue-500 font-customfont hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
