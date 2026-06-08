import React, { useState, useEffect } from 'react';
import useScrollSpy from '../hooks/useScrollSpy';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'education', 'leadership', 'contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTIONS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand interactive" onClick={() => scrollToSection('home')}>
        <span className="brand-dot"></span>AR<span className="brand-acc">.</span>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <button 
          className="nav-close interactive" 
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        {SECTIONS.map((section) => (
          <button
            key={section}
            className={`nav-link interactive ${activeSection === section ? 'active' : ''}`}
            onClick={() => scrollToSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <button 
        className="nav-toggle interactive" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default Navbar;
