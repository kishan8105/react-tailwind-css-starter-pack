import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, Loader2, Linkedin, Twitter, Phone } from 'lucide-react';
import * as THREE from "three";

// Animated form input component
const AnimatedInput = ({
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  required = false,
  name,
  error
}) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    setFilled(value !== '');
  }, [value]);

  const labelVariants = {
    default: { y: 0, scale: 1, color: "rgb(156 163 175)" },
    focused: { y: -30, scale: 0.8, color: focused ? "rgb(99 102 241)" : "rgb(156 163 175)" }
  };

  const underlineVariants = {
    default: { scaleX: 0 },
    focused: { scaleX: 1 }
  };

  return (
    <div className="mb-6 relative">
      <div className="relative">
        <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 focus-within:border-indigo-500 transition-colors duration-300">
          <Icon className={`w-5 h-5 ${focused ? 'text-indigo-500' : 'text-gray-400'} transition-colors duration-300`} />

          <div className="relative flex-1">
            <motion.span
              variants={labelVariants}
              initial="default"
              animate={(focused || filled) ? "focused" : "default"}
              className="absolute left-0 pointer-events-none transition-all duration-300"
            >
              {placeholder}
            </motion.span>

            {type === "textarea" ? (
              <textarea
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                rows={5}
                className="bg-transparent w-full outline-none text-white pt-0"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                className="bg-transparent w-full outline-none text-white"
              />
            )}
          </div>
        </div>

        <motion.div
          variants={underlineVariants}
          initial="default"
          animate={focused ? "focused" : "default"}
          className="h-0.5 bg-indigo-500 rounded absolute bottom-0 left-0 right-0 origin-left"
          transition={{ duration: 0.3 }}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2 pl-9"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Contact form with animations and validation
function Contact() {
  const formRef = useRef(null);
  const threeJsContainerRef = useRef(null);
  const controls = useAnimation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    contact: "",
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // API url - this should be in an environment variable in a real application
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://my-portfolio-drrm.onrender.com/api';
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
    return () => {
      window.removeEventListener("resize", handleResize);
      threeJsContainerRef.current?.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formState.contact.trim()) {
      newErrors.contact = 'Contact is required';
    } else if (!/^\d{10,15}$/.test(formState.contact.trim())) {
      newErrors.contact = 'Contact must be a valid number (10-15 digits)';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send data to backend API
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // On success
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '', contact: '' });

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ 
        form: error.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
          });
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, [controls]);

  return (
    <section id="contact" className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left column - Contact information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                Let's Connect
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8">
              Have a project in mind or just want to say hello? I'd love to hear from you. Fill out the form, and I'll get back to you as soon as possible.
            </p>

            {/* Contact details */}
            <div className="space-y-6 mb-10">
              {/* Email */}
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:kishan@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border border-gray-700">
                  <Mail className="w-5 h-5" />
                </div>
                <span>kishan@gmail.com</span>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                whileHover={{ x: 5 }}
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border border-gray-700">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span>Kishan Raj Patel</span>
              </motion.a>

              {/* Twitter */}
              <motion.a
                whileHover={{ x: 5 }}
                href="https://twitter.com/iam_rajkishan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border border-gray-700">
                  <Twitter className="w-5 h-5" />
                </div>
                <span>iam_rajkishan</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right column - Contact form */}
          <div className="w-full lg:w-3/5" ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700 p-8 shadow-xl"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
                transition: "transform 0.1s ease-out"
              }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-indigo-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-gray-300">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className=""
                >
                  <AnimatedInput
                    name="name"
                    placeholder="Your Name"
                    icon={User}
                    value={formState.name}
                    onChange={handleChange}
                    required
                    error={errors.name}
                  />
                  <AnimatedInput
                    name="contact"
                    placeholder="Your Contact Number"
                    icon={Phone}
                    value={formState.contact}
                    onChange={handleChange}
                    required
                    error={errors.contact}
                  />

                  <AnimatedInput
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    icon={Mail}
                    value={formState.email}
                    onChange={handleChange}
                    required
                    error={errors.email}
                  />

                  <AnimatedInput
                    type="textarea"
                    name="message"
                    placeholder="Your Message"
                    icon={MessageSquare}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    error={errors.message}
                  />

                  {errors.form && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-center mt-4"
                    >
                      {errors.form}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting}
                    className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg py-4 px-6 flex items-center justify-center disabled:opacity-70 transition-colors duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;