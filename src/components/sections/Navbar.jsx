import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useSpring as useReactSpring, animated as a } from '@react-spring/web';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  
  // References for each section to track visibility more accurately
  const navbarRef = useRef(null);
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  
  // Track scroll position to change navbar appearance and detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      
      // Update active section based on scroll position with improved detection
      const sections = ['hero', 'skills', 'education', 'projects', 'contact'];
      let closestSection = 'hero';
      let closestDistance = Infinity;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        }
      }
      
      setActiveSection(closestSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    
    // Only add listener if mobile menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  // Close mobile menu when screen is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  // Enhanced logo animation with react-spring (simplified for mobile)
  const logoSpring = useReactSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      await next({ transform: 'scale(1.1) rotate(5deg)', config: { tension: 120, friction: 14 } });
      await next({ transform: 'scale(1) rotate(0deg)', config: { tension: 120, friction: 14 } });
    },
  });
  
  // Enhanced navigation items with vibrant colors and unique icons
  const navItems = [
    { 
      id: 'hero', 
      label: 'Home', 
      icon: '🏠', 
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'from-blue-400 to-indigo-500',
      shadowColor: 'rgba(79, 70, 229, 0.4)'
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: '⚡', 
      color: 'from-emerald-500 to-teal-600',
      hoverColor: 'from-emerald-400 to-teal-500',
      shadowColor: 'rgba(5, 150, 105, 0.4)'
    },
    { 
      id: 'education', 
      label: 'Education', 
      icon: '🎓', 
      color: 'from-amber-500 to-orange-600',
      hoverColor: 'from-amber-400 to-orange-500',
      shadowColor: 'rgba(217, 119, 6, 0.4)'
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: '🚀',
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'from-purple-400 to-violet-500',
      shadowColor: 'rgba(124, 58, 237, 0.4)'
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: '✉️', 
      color: 'from-rose-500 to-pink-600',
      hoverColor: 'from-rose-400 to-pink-500',
      shadowColor: 'rgba(225, 29, 72, 0.4)'
    },
  ];

  // Simplified animation variants for better mobile performance
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: { 
      scale: 1.05,
      y: -3,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };
  
  // Optimized mobile menu animation
  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.4,
        staggerChildren: 0.07,
        ease: "easeOut"
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { 
      opacity: 0, 
      x: -10,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  // Improved smooth scrolling function for all devices
  const scrollToSection = (sectionId) => {
    // First close the mobile menu
    setIsMobileMenuOpen(false);
    
    // Delay scrolling slightly to allow menu close animation on mobile
    setTimeout(() => {
      // Special case for hero section which is the first element
      if (sectionId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setActiveSection('hero');
        return;
      }
      
      const element = document.getElementById(sectionId);
      
      if (element) {
        // Calculate offset to account for navbar height
        const navbarHeight = 64; // 4rem or h-16
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update active section immediately for better UX
        setActiveSection(sectionId);
      }
    }, 50);
  };

  // Hover indicator animation for desktop nav items
  const HoverIndicator = ({ isActive, color, isHovering }) => {
    return (
      <motion.div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${color} z-[-1]`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ 
          opacity: isActive || isHovering ? 1 : 0, 
          scale: isActive ? 1 : isHovering ? 0.98 : 0.85
        }}
        transition={{ duration: 0.2 }}
        style={{
          boxShadow: isActive ? `0 10px 15px -3px ${color.includes('emerald') ? 'rgba(5, 150, 105, 0.3)' : color.includes('blue') ? 'rgba(79, 70, 229, 0.3)' : color.includes('amber') ? 'rgba(217, 119, 6, 0.3)' : color.includes('purple') ? 'rgba(124, 58, 237, 0.3)' : 'rgba(225, 29, 72, 0.3)'}` : 'none'
        }}
      />
    );
  };

  return (
    <>
      <motion.nav 
        ref={navbarRef}
        className="fixed w-full z-50 transition-all duration-500"
        style={{ 
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: `blur(${isScrolled ? '12px' : '8px'})`,
          boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)' : 'none'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with enhanced animation */}
            <div className="flex-shrink-0 flex-1 md:flex-initial">
              <a.div 
                style={logoSpring} 
                className="flex items-center cursor-pointer"
                onClick={() => scrollToSection('hero')}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src="/images/logo.png" 
                    alt="Logo" 
                    className="w-10 h-10 md:w-12 md:h-12 drop-shadow-xl" 
                  />
                </motion.div>
                <motion.h1 
                  className="ml-2 md:ml-3 text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 text-transparent bg-clip-text truncate"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Kishan Raj Patel
                </motion.h1>
              </a.div>
            </div>
            
            {/* Desktop navigation with enhanced design */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative rounded-[10px] px-1 py-1"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={itemVariants}
                    onHoverStart={() => setIsHovering(item.id)}
                    onHoverEnd={() => setIsHovering(null)}
                  >
                    <motion.a
                      href={`#${item.id}`}
                      className={`relative block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === item.id || isHovering === item.id
                          ? 'text-black'
                          : 'text-black dark:text-black-900 '
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      <HoverIndicator 
                        isActive={activeSection === item.id} 
                        color={isHovering === item.id && activeSection !== item.id ? item.hoverColor : item.color}
                        isHovering={isHovering === item.id}
                      />
                      
                      <motion.span 
                        className="flex items-center"
                        animate={{ 
                          y: activeSection === item.id ? [0, -2, 0] : 0
                        }}
                        transition={{ 
                          duration: 0.5,
                          repeat: activeSection === item.id ? 3 : 0,
                          repeatDelay: 3
                        }}
                      >
                        <motion.span 
                          className="mr-2 text-lg"
                          animate={{ 
                            scale: activeSection === item.id ? [1, 1.2, 1] : 1,
                            rotate: activeSection === item.id ? [0, 5, 0] : 0
                          }}
                          transition={{ 
                            duration: 0.5,
                            repeat: activeSection === item.id ? 3 : 0,
                            repeatDelay: 3
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        {item.label}
                      </motion.span>
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Enhanced mobile menu button with improved touch target */}
            <div className="md:hidden flex justify-end">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none touch-manipulation"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <motion.span
                    className="absolute h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-purple-600 transform transition-transform rounded-full"
                    animate={{ 
                      top: isMobileMenuOpen ? "50%" : "30%",
                      rotate: isMobileMenuOpen ? 45 : 0,
                      translateY: isMobileMenuOpen ? "-50%" : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full top-1/2 transform -translate-y-1/2"
                    animate={{ 
                      opacity: isMobileMenuOpen ? 0 : 1,
                      width: isMobileMenuOpen ? 0 : 24
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-purple-600 transform transition-transform rounded-full"
                    animate={{ 
                      top: isMobileMenuOpen ? "50%" : "70%",
                      rotate: isMobileMenuOpen ? -45 : 0,
                      translateY: isMobileMenuOpen ? "-50%" : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Optimized mobile menu with improved touch interactions */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <motion.div 
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block relative overflow-hidden px-3 py-3 rounded-lg text-base font-medium touch-manipulation ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollToSection(item.id);
                    }}
                    variants={mobileItemVariants}
                    whileTap={{ scale: 0.97 }}
                    custom={index}
                  >
                    {/* Background gradient for mobile items */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} z-[-1]`}
                      initial={{ x: activeSection === item.id ? 0 : '-100%' }}
                      animate={{ x: activeSection === item.id ? 0 : '-100%' }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: activeSection === item.id ? `0 4px 6px -1px ${item.shadowColor}` : 'none'
                      }}
                    />
                    
                    <motion.span 
                      className="flex items-center"
                    >
                      <motion.span 
                        className="mr-3 text-xl"
                        animate={{ 
                          scale: activeSection === item.id ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ 
                          duration: 0.5,
                          repeat: activeSection === item.id ? 2 : 0,
                          repeatDelay: 2
                        }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="font-medium">{item.label}</span>
                      
                      {activeSection === item.id && (
                        <motion.span 
                          className="ml-auto" 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>
              
              {/* Safe area at bottom for easier touch dismissal */}
              <div className="h-1 w-full  touch-manipulation" onClick={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Progress indicator at the top of the navbar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      
      {/* Empty div for scroll padding to ensure content isn't hidden under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;