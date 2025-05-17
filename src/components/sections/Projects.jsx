import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Environment } from "@react-three/drei";
import { Clock } from "lucide-react";

// Animated 3D spheres background
const AnimatedSpheres = () => {
  const sphereRef = useRef();

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.2;
      sphereRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={sphereRef}>
      {[...Array(6)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.2, 16, 16]}
          position={[
            Math.sin((i / 3) * Math.PI * 2) * 3,
            Math.cos((i / 4) * Math.PI * 2) * 2,
            Math.sin((i / 5) * Math.PI * 2) * 3,
          ]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? "#3b82f6" : "#06b6d4"}
            emissive={i % 2 === 0 ? "#3b82f6" : "#06b6d4"}
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Project card component
const ProjectCard = ({
  position,
  company,
  college,
  duration,
  description,
  skills,
  imageSrc,
  delay = 0,
}) => {
  const [ setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="w-full mb-8"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 h-full flex flex-col justify-between shadow-md`}
      >
        {/* Image at the top */}
        <div className="relative w-full h-48">
          <img
            src={imageSrc || "/api/placeholder/400/320"}
            alt={`${position} project`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{position}</h3>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </span>
          </div>

          <h4 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-3">
            {college}
          </h4>
          {company && (
            <h4 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-3">
              {company}
            </h4>
          )}

          <p className="text-gray-300 mb-4 flex-grow">{description}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Projects component
const Projects = () => {
  const projects = [
    {
      position: "Early Detection of Dementia",
      college: "KIIT University",
      duration: "05-April 2025",
      description:
        "This project focuses on creating hybrid machine learning models that combine genetic data and neuroimaging analysis for early detection of dementia. Using techniques like feature selection for genetic markers and CNNs for analyzing MRI scans, the model improves diagnostic accuracy by leveraging complementary insights from both data types.",
      skills: ["\uD83D\uDDA5️", "Python", "ML", "Jupyter"],
      imageSrc: "/1st.jpg",
    },
    {
      position: "Online Admission System",
      college: "Martin Luther Christian University",
      duration: "15-Mar-2022",
      description:
        "Designed and developed a dynamic website for managing school admission processes using PHP, HTML, and CSS. The project streamlined student registrations, applications, and administrative tasks.",
      skills: ["\uD83D\uDDA5️", "PHP", "HTML", "CSS"],
      imageSrc: "/2nd.jpg",
    },
    {
      position: "Online Hotel Booking",
      company: "Own Project",
      duration: "20-Jun-2021",
      description:
        "Developed a user-friendly web application for hotel booking using PHP, HTML, and CSS. Key features included real-time availability updates, user authentication, booking confirmation via email, and a responsive design.",
      skills: ["\uD83D\uDDA5️", "HTML/CSS", "JavaScript"],
      imageSrc: "/3rd.jpg",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <AnimatedSpheres />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Projects
            </span>
          </h2>
          <div className="max-w-2xl mx-auto text-xl text-gray-300">
            My Journey Building Innovative Solutions and Delivering Impactful
            Results
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300"
          >
            Let's Work Together
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;