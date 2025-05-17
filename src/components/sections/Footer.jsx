import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Github } from "lucide-react";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  // Social media links with their icons
  const socialLinks = [
    {
      id: "github",
      name: "GitHub",
      username: "kishan8105", // Add username here
      icon: <Github size={20} />,
      url: "https://github.com",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      username: "iam_rajkishan", // Add username here
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com",
    },
    {
      id: "twitter",
      name: "Twitter",
      username: "kishan8105", // Add username here
      icon: <Twitter size={20} />,
      url: "https://twitter.com",
    },
    {
      id: "instagram",
      name: "Instagram",
      username: "iam_rajkishan", // Add username here
      icon: <Instagram size={20} />,
      url: "https://instagram.com",
    },
  ];

  // Check if footer is in viewport
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;
      setIsVisible(bottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">

          {/* Follow Me */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-left">Follow Me</h3>
            <div className="flex flex-col space-y-4 items-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-purple-500 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300">
                    {social.username}
                  </span>
                  <span>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-left">Contact Me</h3>
            <ul className="space-y-2 text-left">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:kishan8105@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  kishan8105@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                <span className="text-gray-400">+91 8789220586</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                <span className="text-gray-400">Patna, Bihar</span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription form */}
          <div className="col-span-1">
            <motion.div
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-right mb-4">
                <h3 className="text-lg font-semibold">
                  Subscribe to My Newsletter
                </h3>
                <p className="text-gray-400 text-sm">
                  Stay updated with my latest projects and tech insights.
                </p>
              </div>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-medium hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Copyright section */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          &copy; {currentYear} All Rights Reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
