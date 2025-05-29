import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaVideo, FaUsers, FaGlobe, FaShieldAlt } from "react-icons/fa";
import "./Homepage.css";

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah K.",
      location: "New York",
      text: "QuickMeet helped me practice my Spanish with native speakers. The interface is so intuitive!",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "David L.",
      location: "London",
      text: "I've made friends from across the globe. The interest matching feature is spot on!",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Mia C.",
      location: "Tokyo",
      text: "The video quality is excellent and I love how easy it is to find people with similar interests.",
      avatar: "/api/placeholder/60/60"
    }
  ];

  // Stats data
  const stats = [
    { label: "Active Users", value: "10,000+" },
    { label: "Countries", value: "120+" },
    { label: "Languages", value: "25+" },
    { label: "Daily Connections", value: "50,000+" }
  ];

  // Features data
  const features = [
    {
      icon: <FaVideo />,
      title: "HD Video Chat",
      description: "Crystal clear video and audio for the best conversation experience"
    },
    {
      icon: <FaUsers />,
      title: "Interest Matching",
      description: "Connect with people who share your passions and hobbies"
    },
    {
      icon: <FaGlobe />,
      title: "Global Reach",
      description: "Meet people from different cultures and practice languages"
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description: "Advanced moderation and privacy controls keep you protected"
    }
  ];

  // Simulate loading effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-purple-800 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                QuickMeet
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Meet interesting people from around the world through video chat.
              Connect based on shared interests and languages in seconds.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/Login"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Chatting Now
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-24 md:h-32"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-white"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-white"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose QuickMeet?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to create meaningful connections in a safe environment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-purple-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6"
              >
                <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
                <p className="text-lg text-blue-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden relative h-80">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 100,
                    zIndex: activeTestimonial === index ? 10 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mb-4 object-cover border-4 border-blue-200"
                    />
                    <p className="text-xl text-gray-700 italic mb-6">"{testimonial.text}"</p>
                    <div className="text-center">
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-700 to-purple-900 relative overflow-hidden">
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-5"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Meeting New People?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already expanding their social circles with QuickMeet.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/Login"
                className="px-10 py-4 text-lg bg-white text-blue-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your First Chat
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">QuickMeet</h3>
              <p className="text-blue-300">© 2025 QuickMeet. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Support</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;