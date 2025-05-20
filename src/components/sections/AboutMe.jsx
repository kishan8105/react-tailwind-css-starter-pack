import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, ExternalLink, Gamepad, Code, Music, Book } from 'lucide-react';
import {Github} from 'lucide-react';

const AboutMe = () => {
  // Replace with your information
  const personalInfo = {

    name: "Kishan Raj Patel",
    title: "Full-Stack Developer",
    bio: "Hey!  I'm Kishan.  Making captivating and user-focused digital experiences is something I am extremely passionate about.  I contribute a broad skill set to any project I work on, having mastered HTML, CSS, and JavaScript and having practical expertise with cutting-edge frontend frameworks like React.js. Motivated by a sincere interest in new technologies and a dedication to following market developments, I'm always looking for ways to push the envelope and improve frontend development.  I work best in dynamic contexts where technical brilliance and creativity coexist, whether I'm exploring the complexities of code optimisation or working with cross-functional teams to bring thoughts to life.For me, it has been a very fulfilling and distinctive experience to work cooperatively with a team to achieve a common goal.  I'm excited to keep working on interesting projects in the future, and I'm especially interested in cross-platform mobile and web programming.",
    location: "Bihar, India",
    email: "kishan8105@gmail.com",
    Github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    website: "https://alexjohnson.dev",
    skills: ["Java","JavaScript","React", "CSS", "Tailwind CSS","HTML5","Node.js","Express","MongoDB","Git" ],
    interests: [
      { name: "Coding", icon: <Code size={20} /> },
      { name: "Music", icon: <Music size={20} /> },
      { name: "Reading", icon: <Book size={20} /> },
      { name: "Gaming", icon: <Gamepad size={20} /> },
    ],
   
  };


  const [activeTab, setActiveTab] = useState('about');

  const tabVariants = {
    active: { 
      borderBottom: "2px solid #60A5FA",
      color: "#60A5FA",
      fontWeight: "600"
    },
    inactive: { 
      borderBottom: "2px solid transparent",
      color: "#000000",
      fontWeight: "400"
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const skillVariants = {
    hidden: { opacity: 0 },
    visible: custom => ({
      opacity: 1,
      transition: { delay: custom * 0.1 }
    })
  };

  return (

    <div id="about" className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 text-gray-100">

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-white-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
                  {/* Header Section */}
                  <div className="relative">
                      {/* Background Cover */}
                      <div className="h-80">
                          <img
                              src="10th.jpg"
                              alt="Profile"
                              className="w-full h-full object-cover"
                          />
                      </div>
            
                      {/* Profile Section */}
                      <div className="px-6 sm:px-8">
                          <div className="relative flex flex-col sm:flex-row">
                              {/* Profile Image */}
                              <motion.div
                                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-800 bg-gray-800 shadow-lg overflow-hidden -mt-16 sm:-mt-20 mb-4 sm:mb-0"
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.2, duration: 0.5 }}
                              >
                                  <img
                                      src="9th.jpg"
                                      alt="Profile"
                                      className="w-full h-full object-cover"
                                  />
                  
                  
                </motion.div>
                
                {/* Name and Title */}
                <div className="sm:ml-6 sm:mt-2">
                  <motion.h1 
                    className="text-2xl sm:text-3xl font-bold text-black"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {personalInfo.name}
                  </motion.h1>
                  <motion.p 
                    className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {personalInfo.title}
                  </motion.p>
                  
                  <motion.div 
                    className="mt-3 flex items-center text-black font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <span>{personalInfo.location}</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="flex mt-8 border-b border-gray-900">
                <motion.button
                  className="px-4 py-2 mr-4"
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === 'about' ? 'active' : 'inactive'}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </motion.button>

                <motion.button
                  className="px-4 py-2"
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === 'skills' ? 'active' : 'inactive'}
                  onClick={() => setActiveTab('skills')}
                >
                  Skills
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="px-6 sm:px-8 py-8">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-3xl font-bold text-black text-center mb-4">About Me</h2>
                <p className="text-black font-bold leading-relaxed mb-6">
                  {personalInfo.bio}
                </p>
                
                {/* Interests */}
                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {personalInfo.interests.map((interest, index) => (
                    <motion.div
                      key={interest.name}
                      className="flex items-center bg-gray-700 rounded-full px-4 py-2 text-sm text-gray-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <span className="mr-2 text-blue-400">{interest.icon}</span>
                      {interest.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-5">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded-full px-4 py-2 text-sm font-medium border border-blue-700"
                      variants={skillVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default AboutMe;