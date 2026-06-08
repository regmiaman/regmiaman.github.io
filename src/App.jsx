import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Chatbot from './components/Chatbot';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        {/* Global visual nodes & utilities */}
        <CustomCursor />
        <ParticlesBackground />
        <ThemeToggle />
        <Chatbot />

        {/* Header Navigation */}
        <Navbar />

        {/* Main Sections */}
        <main>
          <Hero />
          <div className="divider" />
          <About />
          <div className="divider" />
          <Skills />
          <div className="divider" />
          <Experience />
          <div className="divider" />
          <Education />
          <div className="divider" />
          <Leadership />
          <div className="divider" />
          <Contact />
        </main>

        {/* Footer info */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
