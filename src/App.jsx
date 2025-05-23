import React from 'react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Certificates from './components/sections/Certificates';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Projects from './components/sections/Projects';
import AboutMe from './components/sections/AboutMe';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <AboutMe/>
      <Education />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
