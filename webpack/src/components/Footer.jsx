// Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-8">
        {/* Upper Section */}
        <div className="flex flex-col justify-center items-center mb-8">
          {/* Logo */}
          <h1 className="text-3xl font-bold mb-4 text-center">
            <span className="text-blue-400">U</span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              HIRE
            </span>
          </h1>

          {/* Social Links */}
          <div className="flex space-x-6 text-xl text-gray-400">
            <a href="#" className="hover:text-pink-500 transition duration-300">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-indigo-500 transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-pink-500 transition duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 text-lg">
          <div>
            <h3 className="font-semibold text-gray-100 mb-2">Company</h3>
            <ul>
              <li className="hover:text-white transition duration-300">
                <a href="#">About Us</a>
              </li>
              <li className="hover:text-white transition duration-300">
                <a href="#">Careers</a>
              </li>
              <li className="hover:text-white transition duration-300">
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-100 mb-2">Support</h3>
            <ul>
              <li className="hover:text-white transition duration-300">
                <a href="#">Contact Us</a>
              </li>
              <li className="hover:text-white transition duration-300">
                <a href="#">Help Center</a>
              </li>
              <li className="hover:text-white transition duration-300">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-100 mb-2">Resources</h3>
            <ul>
              <li className="hover:text-white transition duration-300">
                <a href="#">FAQ</a>
              </li>
              <li className="hover:text-white transition duration-300">
                <a href="#">Terms of Service</a>
              </li>
              <li className="hover:text-white transition duration-300">
                <a href="#">Community Guidelines</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Section */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} UHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
