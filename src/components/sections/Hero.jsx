import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import * as THREE from "three";
import { motion } from "framer-motion"; // Import framer-motion

export default function EnhancedPortfolioHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [deviceType, setDeviceType] = useState("desktop");
  const threeJsContainerRef = useRef(null);

  // Detect device type for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ThreeJS background effect
  useEffect(() => {
    if (!threeJsContainerRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    threeJsContainerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Create material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8844ff,
      transparent: true,
      opacity: 0.8,
    });

    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    const currentContainer = threeJsContainerRef.current;

return () => {
  window.removeEventListener("resize", handleResize);
  if (currentContainer?.contains(renderer.domElement)) {
    currentContainer.removeChild(renderer.domElement);
  }
  particlesGeometry.dispose();
  particlesMaterial.dispose();
};

  }, []);

  // Animation variants for framer-motion
  const nameContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.08
      }
    }
  };
  
  const letterVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };

  // Name text for animation
  const nameText = "Kishan";
  const nameLetters = Array.from(nameText);

  // Social media links with enhanced hover effects
  const socialLinks = [
    { 
      icon: <Github size={20} />, 
      link: "https://github.com", 
      hoverColor: "hover:bg-gray-700", 
      hoverTextColor: "hover:text-blue-400",
      hoverRingColor: "hover:ring-blue-400",
      tooltip: "Check my projects"
    },
    { 
      icon: <Linkedin size={20} />, 
      link: "https://linkedin.com", 
      hoverColor: "hover:bg-blue-700", 
      hoverTextColor: "hover:text-blue-300",
      hoverRingColor: "hover:ring-blue-300",
      tooltip: "Connect with me"
    },
    { 
      icon: <Mail size={20} />, 
      link: "mailto:yourname@example.com", 
      hoverColor: "hover:bg-red-600", 
      hoverTextColor: "hover:text-red-200",
      hoverRingColor: "hover:ring-red-400",
      tooltip: "Send me a message"
    },
  ];

  // Smooth scroll functions for navigation
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Smooth scroll function for next section
  const scrollToNextSection = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white relative overflow-hidden pb-20">
      {/* ThreeJS container for background effect */}
      <div 
        ref={threeJsContainerRef} 
        className="absolute inset-0 z-0 opacity-50"
      />

      {/* Animated background gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute -top-40 -left-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-3xl"
          style={{ 
            transform: deviceType !== "mobile" ? 
              `rotate(${mousePosition.x * 20}deg) translateX(${mousePosition.x * 30}px) translateY(${mousePosition.y * 30}px)` : 
              'none'
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-2xl rounded-full"
          style={{ 
            transform: deviceType !== "mobile" ? 
              `scale(${1 + mousePosition.x * 0.1}) translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)` : 
              'none'
          }}
        />
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-12 relative z-10">
        {/* Content wrapper with improved iPad layout */}
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[70vh]">
          
          {/* Left Section with Social Media Icons - Responsive for all devices */}
          <div className="hidden md:flex flex-col space-y-6 items-center justify-center mb-8 md:mb-0 md:w-1/12 lg:w-1/12">
            <div className="flex flex-col space-y-3">
              {socialLinks.map(({ icon, link, hoverColor, hoverTextColor, hoverRingColor, tooltip }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative bg-gray-800 p-3 md:p-4 rounded-full shadow-lg flex flex-col items-center justify-center group ${hoverColor} 
                  transition-all duration-300 ring-2 ring-transparent ${hoverRingColor} hover:ring-offset-2 hover:ring-offset-gray-900`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`${hoverTextColor}`}>
                    {icon}
                  </div>
                  <span className="absolute whitespace-nowrap -right-2 top-0 bg-gray-100 text-gray-900 text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none font-medium transition-opacity duration-300">
                    {tooltip}
                  </span>
                  
                  {/* Outer glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-full blur-md bg-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Social Icons Row (visible only on small screens) */}
          <div className="flex md:hidden justify-center space-x-4 w-full mb-6">
            {socialLinks.map(({ icon, link, hoverColor, hoverTextColor }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative bg-gray-800 p-3 rounded-full shadow-lg flex items-center justify-center ${hoverColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`${hoverTextColor}`}>
                  {icon}
                </div>
              </motion.a>
            ))}
          </div>

          {/* Center Text Content - Fixed for iPad Pro */}
          <div className="flex flex-col justify-center items-center md:items-start text-white max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8 min-h-auto md:min-h-[40vh] lg:min-h-[50vh] md:w-1/2 lg:w-5/12">
            <div className="text-center md:text-left space-y-4 md:space-y-6 w-full">
              {/* Fixed alignment for the name and added animation */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 flex flex-wrap items-baseline"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <span className="mr-2">Hi, I'm</span>
                <motion.span 
                  className="inline-flex"
                  variants={nameContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {nameLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
                      variants={letterVariant}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-white font-bold mb-2 md:mb-4 text-sm sm:text-base md:text-lg"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                "I am a passionate Frontend Web Developer dedicated to crafting sleek, responsive, and user-friendly websites. I thrive on transforming ideas into visually compelling digital experiences, blending creativity with technical precision."
              </motion.p>
      
              <motion.p 
                className="text-blue-300 font-medium text-sm sm:text-base"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              >
                "Always learning and evolving to deliver exceptional web solutions that make an impact."
              </motion.p>
            </div> 
          </div>

          {/* Right Side Profile Image - Fixed for iPad Pro */}
          <motion.div
            className="w-full md:w-5/12 lg:w-4/12 mx-auto mt-8 lg:mt-0 mb-20 sm:mb-24 md:mb-20"
            style={{
              transform: deviceType !== "mobile" ? 
                `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)` : 
                'none',
              transition: 'transform 0.3s ease'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] mt-0 md:mt-[20px] duration-500">
              <img
                alt="Kishan's Profile"
                src="8th.png"
                className="w-full h-full object-contain transition-transform duration-500 ease-in-out"
                style={{ maxWidth: '100%' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section with Scroll Indicator */}
        <div className="w-full flex flex-col items-center space-y-3 md:space-y-6 mt-4 sm:mt-8 md:mt-12 pb-6">
          {/* CTA Buttons with improved iPad layout */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-3 md:space-x-4 w-full">
            <motion.button 
              className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm md:text-base font-medium rounded-lg shadow-lg relative overflow-hidden group cursor-pointer w-[180px] md:w-auto"
              onClick={scrollToProjects}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
            
            <motion.button 
              className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm md:text-base font-medium rounded-lg shadow-lg relative overflow-hidden group cursor-pointer w-[180px] md:w-auto"
              onClick={scrollToContact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contact Me</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            <motion.div
              className="inline-flex gap-4 items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.a
                href="/Kishan_Patel.pdf"
                download
                className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-[180px] md:w-auto justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} className="md:w-[18px] md:h-[18px]" />
                <span>Resume</span>
                <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll Down Mouse Icon - Hide on very small screens */}
          <motion.div
            className="hidden sm:flex w-6 h-10 border-2 border-white rounded-full items-start justify-center p-1 opacity-70 hover:opacity-100 cursor-pointer"
            onClick={scrollToNextSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-1 h-1 rounded-full bg-white"
              animate={{ 
                y: [0, 6, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}