import React, { useState } from 'react';
import { User, Lock, Mail, Smartphone } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const QuickMeetSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      if (response.ok) {
        alert("Signup successful!");
        navigate("/Login"); // ✅ Redirect to login on success
      } else {
        const errorText = await response.text();
        alert("Signup failed! Reason: " + errorText);
      }
    } catch (error) {
      alert("Signup failed due to network or server error.");
      console.error("Error:", error);
    }
  };  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-3xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">QuickMeet</h1>
            <p className="text-gray-500 text-sm">Create Your Account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400 w-5 h-5" />
              </div>
              <input 
                type="text" 
                name="username"
                placeholder="Username" 
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400 w-5 h-5" />
              </div>
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="text-gray-400 w-5 h-5" />
              </div>
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 w-5 h-5" />
              </div>
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 w-5 h-5" />
              </div>
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 transform active:scale-95"
            >
              Sign Up
            </button>
          </form>
          
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm">
              Already have an account? 
              <Link to="/Login" className="text-blue-600 hover:underline ml-1">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickMeetSignUp;