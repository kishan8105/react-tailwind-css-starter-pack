import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from 'react-spring';
import {  MeshDistortMaterial, Environment } from '@react-three/drei';
import {  ExternalLink } from 'lucide-react';

// Floating particles background effect
const FloatingParticles = () => {
  const particlesRef = useRef();
  
  // Random positions for particles
  const particles = [...Array(50)].map(() => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 5
    ],
    size: Math.random() * 0.1 + 0.05,
    rotation: Math.random() * Math.PI,
    speed: Math.random() * 0.01 + 0.005
  }));

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      
      // Update each particle child
      particlesRef.current.children.forEach((particle, i) => {
        particle.rotation.x += delta * particles[i].speed * 2;
        particle.rotation.z += delta * particles[i].speed;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh 
          key={i} 
          position={particle.position}
          rotation={[particle.rotation, particle.rotation, particle.rotation]}
        >
          <octahedronGeometry args={[particle.size, 0]} />
          <MeshDistortMaterial
            color="#4f46e5"
            emissive="#3730a3"
            emissiveIntensity={0.4}
            roughness={0.5}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Certificate card component with animations
const CertificateCard = ({ 
  title, 
  issuer, 
  date, 
  image, 
  skills, 
  credentialLink, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const cardSpring = useSpring({
    scale: isHovered ? 1.03 : 1,
    boxShadow: isHovered 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
      : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
    rotateY: isFlipped ? 180 : 0,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  
  const moveInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={moveInVariants}
      className="w-full h-full"
    >
      <animated.div 
        style={{
          ...cardSpring,
          transformStyle: 'preserve-3d'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full h-full relative cursor-pointer bg-transparent"
      >
        {/* Front of card */}
        <div 
          className={`w-full h-full absolute inset-0 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden
                     ${isFlipped ? 'backface-hidden' : ''}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-48 overflow-hidden">
            <div>
              
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <Award className="w-20 h-20 text-white opacity-30" /> */}
            </div>
            {image && (
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover opacity-50"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
              <h3 className="text-xl font-bold text-white truncate">{title}</h3>
              <p className="text-indigo-300 text-sm">{issuer}</p>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300 text-sm">{date}</span>
              <span className="text-xs text-gray-400 italic">Click to view details</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {(skills || []).slice(0, 4).map((skill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-gray-700 text-gray-200 text-xs font-medium rounded-full border border-gray-600"
                >
                  {skill}
                </span>
              ))}
              {skills && skills.length > 4 && (
                <span className="px-3 py-1 bg-gray-700 text-gray-400 text-xs font-medium rounded-full border border-gray-600">
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Back of card with more details */}
        <div 
          className={`w-full h-full absolute inset-0 bg-gray-800 rounded-xl border border-gray-700 overflow-auto p-6
                    ${isFlipped ? '' : 'backface-hidden'}`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-indigo-300 mb-4">{issuer} • {date}</p>
            
            <div className="mb-4">
              <h4 className="text-gray-300 font-medium mb-2">Skills Learned:</h4>
              <div className="flex flex-wrap gap-2">
                {(skills || []).map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gray-700 text-gray-200 text-xs font-medium rounded-full border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-auto">
              {credentialLink && (
                <a 
                  href={credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>View Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <p className="text-gray-400 text-sm mt-4 italic">Click card to flip back</p>
            </div>
          </div>
        </div>
      </animated.div>
    </motion.div>
  );
};

function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const certificates = [
    {
      title: "Advanced Robotics with IoT",
      issuer: "Tech Booster",
      date: "June 2021",
      image: "4th.jpg", // Using placeholder image
      skills: ["Arduino", "Raspberry Pi", "C++", "Sensors", "IoT Protocols", "Circuit Design"],
      credentialLink: "#"
    },
    {
      title: "Full-Stack Web DevelopmentApp",
      issuer: "CodeAcademy",
      date: "January 2023",
      image: "5th.jpg", // Using placeholder image
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express", "REST API",],
      credentialLink: "#"
    },
    {
      title: "Applied Python-II",
      issuer: "KIIT University",
      date: "December 2023",
      image: "6th.jpg", // Using placeholder image
      skills: ["Python", "Pandas", "NumPy", "Jupiter", "Machine Learning Basics"],
      credentialLink: "#"
    }
  ];

  

  // Calculate visible certificates indices
  const getVisibleIndices = () => {
    const result = [];
    // Mobile: 1 card, Tablet: 2 cards, Desktop: 3 cards
    const cardCount = {
      mobile: 1,
      tablet: 2,
      desktop: 3
    };
    
    // Add current card and subsequent cards based on screen size
    for (let i = 0; i < cardCount.desktop; i++) {
      const index = (currentIndex + i) % certificates.length;
      result.push(index);
    }
    
    return result;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-gray-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} color="#3730a3" intensity={0.5} />
          <FloatingParticles />
          <Environment preset="night" />
        </Canvas>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-indigo-900/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Professional Certificates
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Credentials that validate my expertise and technical skills
          </p>
        </motion.div>
        
        {/* Certificates carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center z-20">
            {/* <button 
              onClick={handlePrev}
              className="bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-2 backdrop-blur-sm ml-2 text-white border border-gray-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
              aria-label="Previous certificate"
            >
              <ArrowLeft className="w-6 h-6" />
            </button> */}
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center z-20">
            {/* <button 
              onClick={handleNext}
              className="bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-2 backdrop-blur-sm mr-2 text-white border border-gray-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
              aria-label="Next certificate"
            >
              <ArrowRight className="w-6 h-6" />
            </button> */}
          </div>
          
          {/* Certificates grid/carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {visibleIndices.map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="h-96"
              >
                <CertificateCard 
                  {...certificates[index]}
                  index={index - currentIndex}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 gap-2">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (animating) return;
                  setAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setAnimating(false), 500);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  visibleIndices.includes(index) 
                    ? "bg-indigo-500 w-4" 
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;