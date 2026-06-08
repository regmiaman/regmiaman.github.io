import React, { useEffect, useState } from 'react';
import { Mail, Phone, ArrowUpRight, Code, BookOpen, Heart } from 'lucide-react';
import useTypingEffect from '../hooks/useTypingEffect';
import './Hero.css';

const WORDS = [
  'Software Engineer',
  'Spring Boot Developer',
  'React Developer',
  'Full-Stack Developer',
  'Lecturer & Mentor',
  'Problem Solver'
];

const StatCard = ({ targetNum, suffix, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / targetNum));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= targetNum) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [targetNum]);

  return (
    <div className="scard interactive">
      <div className="snum">
        {count}
        {suffix}
      </div>
      <div className="slbl2">{label}</div>
    </div>
  );
};

const Hero = () => {
  const typedText = useTypingEffect(WORDS);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hmesh">
        <div className="horb o1"></div>
        <div className="horb o2"></div>
        <div className="horb o3"></div>
        <div className="horb o4"></div>
      </div>
      <div className="hero-grid"></div>
      <div className="scanline"></div>

      <div className="hero-inner si">
        {/* LEFT Side: Text & Actions */}
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            Open to opportunities · Kathmandu, Nepal
          </div>
          <div className="hero-name-wrap">
            <span className="hero-greeting">Hi There,</span>
            <span className="hero-name">
              I'm <span className="hl">Aman Regmi</span>
            </span>
          </div>
          <p className="hero-role">
            I'm a <span className="typing-text">{typedText}</span>
            <span className="cursor-blink">|</span>
          </p>
          <p className="hero-desc">
            Building innovative software with Java &amp; Spring Boot, React, and modern web technologies. Currently shaping the next generation of developers as a Lecturer at Reliance College, Kathmandu.
          </p>

          <div className="hero-cta">
            <button className="btn-primary interactive" onClick={scrollToContact}>
              Get in Touch
              <ArrowUpRight size={16} />
            </button>
            <button className="btn-ghost interactive" onClick={scrollToWork}>
              View My Work
            </button>
          </div>

          <div className="hero-socials">
            <a href="mailto:developer.amanregmi@gmail.com" className="social-pill interactive">
              <Mail size={14} /> Email
            </a>
            <a href="tel:+9779843804997" className="social-pill interactive">
              <Phone size={14} /> Call
            </a>
            <a href="https://github.com/amanregmi" target="_blank" rel="noreferrer" className="social-pill interactive">
              GitHub
            </a>
            <a href="https://linkedin.com/in/amanregmi" target="_blank" rel="noreferrer" className="social-pill interactive">
              LinkedIn
            </a>
          </div>
        </div>

        {/* RIGHT Side: Profile Photo */}
        <div className="hero-photo-side">
          <div className="photo-frame">
            <div className="photo-frame-inner">
              <img src="files/profilePic.jpg" alt="Aman Regmi" onError={(e) => {
                // fallback if image not loaded
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }} />
              <div className="photo-placeholder" style={{ display: 'none' }}>
                <span className="photo-initials">AR</span>
                <span className="photo-upload-hint">Software Engineer &amp; Lecturer</span>
              </div>
            </div>
            <div className="photo-deco tl"></div>
            <div className="photo-deco tr"></div>
            <div className="photo-deco bl"></div>
            <div className="photo-deco br"></div>

            {/* Floating Tags */}
            <div className="hfc f1 interactive">
              <Code size={14} />
              <span>Spring Boot Dev</span>
            </div>
            <div className="hfc f2 interactive">
              <BookOpen size={14} />
              <span>Lecturer &amp; Mentor</span>
            </div>
            <div className="hfc f3 interactive">
              <Heart size={14} />
              <span>Social Worker</span>
            </div>
            <div className="hfc f4 interactive">
              <Code size={14} />
              <span>React Dev</span>
            </div>
          </div>

          <div className="hero-mini-stats">
            <div className="hms"><div className="hms-n">4+</div><div className="hms-l">Years</div></div>
            <div className="hms"><div className="hms-n">26+</div><div className="hms-l">Projects</div></div>
            <div className="hms"><div className="hms-n">110+</div><div className="hms-l">Members</div></div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="hstats si">
        <StatCard targetNum={4} suffix="+" label="Years Experience" />
        <StatCard targetNum={26} suffix="+" label="Projects Led" />
        <StatCard targetNum={110} suffix="+" label="Members Led" />
        <StatCard targetNum={4} suffix="" label="Subjects Taught" />
      </div>
    </section>
  );
};

export default Hero;
