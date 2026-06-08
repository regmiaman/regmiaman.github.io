import React from 'react';
import { Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <footer className="footer">
      <div className="fbrand interactive" onClick={() => scrollToSection('home')}>
        AR<span className="brand-acc">.</span>
      </div>

       <div className="fsocs">
         <a href="mailto:developer.amanregmi@gmail.com" className="fsoc interactive" aria-label="Mail Aman">
           <Mail size={16} />
         </a>
         <a href="https://github.com/amanregmi" target="_blank" rel="noreferrer" className="fsoc interactive" aria-label="GitHub Profile">
           GitHub
         </a>
         <a href="https://linkedin.com/in/amanregmi" target="_blank" rel="noreferrer" className="fsoc interactive" aria-label="LinkedIn Profile">
           LinkedIn
         </a>
       </div>

      <div className="flinks">
        <button className="interactive" onClick={() => scrollToSection('home')}>Home</button>
        <button className="interactive" onClick={() => scrollToSection('about')}>About</button>
        <button className="interactive" onClick={() => scrollToSection('skills')}>Skills</button>
        <button className="interactive" onClick={() => scrollToSection('experience')}>Experience</button>
        <button className="interactive" onClick={() => scrollToSection('education')}>Education</button>
        <button className="interactive" onClick={() => scrollToSection('leadership')}>Leadership</button>
        <button className="interactive" onClick={() => scrollToSection('contact')}>Contact</button>
      </div>

      <p className="ftxt">Designed &amp; built with ❤️ by Aman Regmi</p>
      <p className="fcopy">© {currentYear} Aman Regmi · Kathmandu, Nepal</p>
    </footer>
  );
};

export default Footer;
