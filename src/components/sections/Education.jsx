import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useSpring as useReactSpring, animated as a } from '@react-spring/web';
import * as THREE from "three";

function Education() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const threeJsContainerRef = useRef(null);
  
  // Setup education data
  const educationData = [
    {
      id: 1,
      degree: "Masters Of Computer Application",
      field: "Computer Science",
      institution: "Kalinga Institute of Industrial Technology (KIIT)",
      location: "Bhubneswar, Odisha",
      period: "2023 - 2025",
      description: "Graduated with distinction. Specialized in Software Development and Data Science. Engaged in academic and industry projects involving Full-Stack Web Development and Database Management.",
      achievements: ["Dean's List (All Semesters)", "Senior Thesis: ' Neural Networks in Edge Computing'", "Teaching Assistant for Data Structures"],
      logo: "🎓",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      degree: "Bachelor of Computer Application",
      field: "Information Technology",
      institution: "Martin Luther Christian  University",
      location: "Shillong, Meghalaya",
      period: "2019 - 2022",
      description: "Developed a strong foundation in Programming amd  Data analytical thinking, with coursework that emphasized problem-solving and critical reasoning skills.",
      achievements: ["Graduate Research Assistant", "Published paper on distributed systems", "Winner, Annual Hackathon 2024"],
      logo: "🔬",
      color: "from-purple-500 to-pink-400"
    },
    {
      id: 3,
      degree: "Higher Secondary Education",
      field: "Science",
      institution: "B.N Uch Vidalaya",
      location: "Patna,Bihar",
      period: "2017-2019",
      description: "Completed studies under the Council of Higher Secondary Education, Bihar with focus on core academic subjects that built a strong foundation for further education..",
      achievements: ["Graduated top of cohort", "Built e-commerce platform as capstone", "Mentored junior students"],
      logo: "💻",
      color: "from-green-500 to-emerald-400"
    }
  ];

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
  const container = threeJsContainerRef.current;
return () => {
  window.removeEventListener("resize", handleResize);
  if (container) container.removeChild(renderer.domElement);
  particlesGeometry.dispose();
  particlesMaterial.dispose();
};

  }, []);

  // Trigger animations when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Background particle animation with react-spring
  const particleSpring = useReactSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(15px)', config: { duration: 2000 } });
        await next({ transform: 'translateY(0px)', config: { duration: 2000 } });
      }
    },
  });

  // Container and item variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.9,
        delayChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Timeline connector line animation
  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: { 
        duration: 1.5, 
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };


  return (
    <section 
      id="education" 
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden min-h-screen"
    >
      {/* ThreeJS container for background effect */}
      <div 
        ref={threeJsContainerRef} 
        className="absolute inset-0 z-0 opacity-50"
      />

      {/* Animated background gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-3xl"
          animate={{ 
            rotate: 360,
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 40, ease: "linear" },
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 }
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-2xl rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          transition={{ 
            scale: { duration: 8, repeat: Infinity },
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 }
          }}
        />
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {/* Animated particles */}
        <a.div style={particleSpring} className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-20 blur-sm"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full opacity-20 blur-sm"></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-green-400 rounded-full opacity-20 blur-sm"></div>
          <div className="absolute bottom-10 right-1/3 w-4 h-4 bg-pink-400 rounded-full opacity-20 blur-sm"></div>
          <div className="absolute top-1/2 left-10 w-3 h-3 bg-yellow-400 rounded-full opacity-20 blur-sm"></div>
          <div className="absolute top-1/4 right-20 w-5 h-5 bg-indigo-400 rounded-full opacity-20 blur-sm"></div>
        </a.div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PHBhdGggZD0iTSA2MCAwIEwgNjAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
            whileInView={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: '200% auto' }}
          >
            Education & Qualifications
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } }
            }}
          >
            My Academic journey and Professional Development path that shaped my Expertise.
          </motion.p>
        </motion.div>
        
        {/* Timeline View (Desktop) */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline connector line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"
              variants={lineVariants}
              initial="hidden"
              animate={controls}
            ></motion.div>
            
            {/* Timeline items */}
            <motion.div
              className="relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {educationData.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className={`mb-12 flex ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10 
                    }
                  }}
                >
                  {/* Content side */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <motion.div 
                      className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors shadow-lg"
                      whileHover={{ 
                        boxShadow: "0 8px 30px rgba(59, 130, 246, 0.2)",
                        borderColor: "#3b82f6"
                      }}
                      style={{
                        transform: `perspective(1000px) rotateY(${mousePosition.x * 5 * (index % 2 === 0 ? 1 : -1)}deg) rotateX(${mousePosition.y * -5}deg)`,
                      }}
                    >
                      <div className={`text-sm font-semibold mb-1 inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20`}>
                        {item.period}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{item.degree}</h3>
                      <h4 className="text-lg text-gray-300 mb-2">{item.field}</h4>
                      <p className="text-gray-400 mb-1 flex items-center justify-end">
                        {index % 2 === 0 ? (
                          <>
                            <span>{item.institution}, {item.location}</span>
                            <span className="ml-2 text-lg">{item.logo}</span>
                          </>
                        ) : (
                          <>
                            <span className="mr-2 text-lg">{item.logo}</span>
                            <span>{item.institution}, {item.location}</span>
                          </>
                        )}
                      </p>
                      <p className="text-gray-300 mt-3">{item.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-0 flex items-start justify-center">
                    <motion.div 
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-4 border-black z-10`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (index * 0.2), type: "spring" }}
                      whileHover={{ 
                        scale: 1.5,
                        boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)"
                      }}
                    />
                  </div>
                  
                  {/* Empty side (for alignment) */}
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Mobile View (Cards) */}
        <div className="md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors shadow-lg"
                whileHover={{ scale: 1.02, borderColor: "#3b82f6" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg)`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-sm font-semibold inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20`}>
                    {item.period}
                  </div>
                  <div className="text-2xl">{item.logo}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{item.degree}</h3>
                <h4 className="text-lg text-gray-300 mb-2">{item.field}</h4>
                <p className="text-gray-400 mb-3">{item.institution}, {item.location}</p>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Education;