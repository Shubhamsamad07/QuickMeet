import React, { useState } from 'react';
import { User, Lock, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';




const QuickMeetLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // <-- this line is required

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate("/Quickmeet");
        alert("Login sucessfull..")
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div 
        className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-3xl ${isHovered ? 'scale-105 shadow-3xl' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">QuickMeet</h1>
            <p className="text-gray-500 text-sm">Your Instant Connection Platform</p>
          </div>
          {error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
    {error}
  </div>
)}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400 w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 w-5 h-5" />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 transform active:scale-95"
            >
              <Send className="w-5 h-5" />
              <span>Login</span>
            </button>
          </form>
          
          <div className="text-center space-y-3">
          <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>

            <p className="text-gray-600 text-sm">
              Don't have an account? 
              <Link to="/signup" className="text-blue-600 hover:underline ml-1">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickMeetLogin;