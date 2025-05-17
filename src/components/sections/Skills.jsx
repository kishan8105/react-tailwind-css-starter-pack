import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {   Star } from 'lucide-react';
// import { Link } from 'react-router-dom';

const SkillsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showAddSkill] = useState(false);
  const [chartView, setChartView] = useState(false);

  // Ref for the scroll animations
  const sectionRef = useRef(null);

  // Expanded skill categories
  const skillCategories = {
    frontend: [
      { name: "JavaScript", level: 90, color: "bg-yellow-400", years: 2, projects: 1 },
      { name: "React", level: 85, color: "bg-blue-500", years: 1, projects: 2 },
      { name: "CSS/SCSS", level: 80, color: "bg-pink-500", years: 4, projects: 4 },
      { name: "HTML5", level: 95, color: "bg-orange-500", years: 4, projects: 4 },
      // { name: "TypeScript", level: 75, color: "bg-blue-600", years: 3, projects: 18 },
    ],
    backend: [
      { name: "Node.js", level: 70, color: "bg-green-600", years: 1, projects: 1 },
      { name: "MongoDB", level: 60, color: "bg-green-500", years: 1, projects: 1 },
      { name: "Express", level: 75, color: "bg-gray-500", years: 1, projects: 1 },
      { name: "Python", level: 60, color: "bg-blue-400", years: 1, projects: 1 },
      // { name: "PostgreSQL", level: 55, color: "bg-blue-800", years: 2, projects: 8 }, 
    ],
    tools: [
      { name: "Git", level: 85, color: "bg-orange-600", years: 5, projects: 5 },
      { name: "Pandas", level: 50, color: "bg-blue-700", years: 1, projects: 1 },
      { name: "Jupyter Notebook", level: 65, color: "bg-blue-300", years: 1, projects: 1 },
      { name: "Google Cloud", level: 60, color: "bg-purple-500", years: 1, projects: 0 },
      { name: "AWS", level: 50, color: "bg-yellow-600", years: 1, projects: 5 },

    ]
  };

  // Get all skills for "all" category
  const allSkills = Object.values(skillCategories).flat();

  // Get current skills based on active category
  const currentSkills = activeCategory === 'all'
    ? allSkills
    : skillCategories[activeCategory] || [];

  // For the chart view
  const chartData = currentSkills.map(skill => ({
    name: skill.name,
    value: skill.level,
    fill: skill.color.replace('bg-', '')
  }));

 useEffect(() => {
  setMounted(true);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    },
    { threshold: 0.1 }
  );

  const currentSection = sectionRef.current;  // <-- copy ref here

  if (currentSection) {
    observer.observe(currentSection);
  }

  return () => {
    if (currentSection) {
      observer.unobserve(currentSection);
    }
  };
}, []);


  // Animation variants
  
  

  


  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg">
          <p className="font-medium text-white">{data.name}</p>
          <p className="text-gray-300">Proficiency: {data.value}%</p>
        </div>
      );
    }
    return null;
  };

  // Calculate skill level text
  const getSkillLevelText = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  return (
    <div id="skills" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4 relative overflow-hidden" ref={sectionRef}>
      {/* Enhanced animated background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 400 + 50,
              height: Math.random() * 400 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 200 + 50)}, 0.08) 0%, rgba(0,0,0,0) 70%)`,
              transform: `translateZ(${Math.random() * -10 - 5}px)`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `float ${Math.random() * 15 + 15}s infinite alternate ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div
          className="space-y-12"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease-in-out"
          }}
        >
          <div className="text-center mb-16">
            <h1
              className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 mb-6"
              
              style={{
                transform: mounted ? "translateY(0)" : "translateY(-50px)",
                opacity: mounted ? 1 : 0,
                transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
              }}
            >
              My Technical Expertise
            </h1>
            <p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                opacity: mounted ? 1 : 0,
                transition: "transform 0.8s ease-out, opacity 0.8s ease-out 0.2s",
              }}
            >
              A comprehensive overview of my professional skills and proficiency levels
            </p>
          </div>

          {/* Category tabs */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-12"
            style={{
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              opacity: mounted ? 1 : 0,
              transition: "transform 0.6s ease-out, opacity 0.6s ease-out 0.3s",
            }}
          >
            {['all', 'frontend', 'backend', 'tools'].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}

            <button
              onClick={() => setChartView(!chartView)}
              className="px-5 py-2 rounded-full font-medium transition-all duration-300 bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 ml-2"
            >
              {chartView ? 'Cards View' : 'Chart View'}
            </button>
          </div>

          {/* Chart View */}
          {chartView && (
            <div
              className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl mb-8"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s"
              }}
            >
              <h2 className="text-2xl font-semibold mb-6">Skills Comparison</h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      animationDuration={1500}
                      barSize={26}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Skills Cards Grid */}
          {!chartView && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s ease-out 0.4s"
              }}
            >
              {currentSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700/40 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease-out ${0.2 + index * 0.1}s, transform 0.5s ease-out ${0.2 + index * 0.1}s`
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-xl">{skill.name}</h3>
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded ${skill.level >= 80 ? 'bg-green-500/20 text-green-300' :
                          skill.level >= 60 ? 'bg-blue-500/20 text-blue-300' :
                            'bg-orange-500/20 text-orange-300'
                          }`}
                      >
                        {getSkillLevelText(skill.level)}
                      </span>
                    </div>
                  </div>

                  <div className="relative h-3 w-full bg-gray-700/50 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full ${skill.color} rounded-full`}
                      style={{
                        width: mounted ? `${skill.level}%` : '0%',
                        transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s`
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{skill.level}% Proficiency</span>
                    <span>{skill.years} {skill.years === 1 ? 'Year' : 'Years'}</span>
                  </div>

                  {/* Expandable details */}
                  <div
                    className={`mt-4 pt-4 border-t border-gray-700/40 text-gray-300 transition-all duration-300 ${hoveredSkill === skill.name ? 'opacity-100' : 'opacity-0 -translate-y-2'
                      }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span>Experience:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.ceil(skill.years / 1.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects completed:</span>
                      <span className="font-medium text-white">{skill.projects}</span>
                    </div>
                  </div>

                  {/* Animated corner gradient accent */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
                  >
                    <div
                      className="absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-gradient-to-bl from-blue-500/30 to-purple-500/0 transform rotate-45"
                    />
                  </div>
                </div>
              ))}

              {/* Add skill card */}
              {showAddSkill && (
                <div
                  className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 border-dashed flex flex-col justify-center items-center min-h-[217px]"
                  style={{
                    opacity: mounted ? 0.8 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease-out, transform 0.5s ease-out`
                  }}
                >
                  
                </div>
              )}
            </div>
          )}

          {/* Resume section */}
          <div
            className="mt-16 text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out 0.7s, transform 0.8s ease-out 0.7s"
            }}
          >
            
          </div>
        </div>
      </div>

      {/* Floating action button to toggle skill addition */}
      {/* <button
        onClick={() => setShowAddSkill(!showAddSkill)}
        className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 transform transition-all duration-300 hover:scale-110"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0)",
          transition: "opacity 0.5s ease-out 1.5s, transform 0.5s ease-out 1.5s"
        }}
      >
        {showAddSkill ? <ChevronUp size={24} /> : <Plus size={24} />}
      </button> */}

      {/* Custom cursor effect (visible only on larger screens) */}
      <div className="hidden md:block">
        <div
          className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-50 pointer-events-none mix-blend-screen"
          style={{
            display: mounted ? "block" : "none",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
          }}
          id="custom-cursor"
        />
      </div>
    </div>
  );
};

export default SkillsSection;

// Add this JS to handle the custom cursor
// Note: In a real implementation, this would be added as a useEffect
/*
document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});
*/