import React from 'react';
import { MapPin, Mail, Phone, Calendar, Code } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section className="section about-sec" id="about">
      <div className="si">
        <div className="slbl">Who I Am</div>
        <h2 className="stitle">About <span>Me</span></h2>
        
        <div className="about-grid">
          {/* LEFT COLUMN: Bio & Details */}
          <div className="about-bio">
            <p className="bio-lead">
              I'm a <strong>software engineer and educator</strong> based in <strong>Kathmandu, Nepal</strong>, passionate about building robust, scalable applications and mentoring the next generation of tech talent.
            </p>
            <p>
              With hands-on experience in <strong>Java, Spring Boot, React,</strong> and modern full-stack development, I've worked on everything from microservices and video calling systems to backup infrastructure. Currently channeling that expertise as a Lecturer at Reliance College.
            </p>
            <p>
              Beyond tech, I'm deeply committed to community — having served as President of a <strong>110+ member Rotaract Club</strong>, organizing 26+ projects from library construction to blood donation drives.
            </p>

            <div className="about-details">
              <div className="det-item interactive">
                <MapPin size={18} />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="det-item interactive">
                <Mail size={18} />
                <span>developer.amanregmi@gmail.com</span>
              </div>
              <div className="det-item interactive">
                <Phone size={18} />
                <span>+977 9843804997</span>
              </div>
              <div className="det-item interactive">
                <Calendar size={18} />
                <span>DOB: 21 April, 1999</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Focus Cards */}
          <div className="about-cards">
            <div className="icard interactive">
              <div className="ic-ico">
                <Code size={26} />
              </div>
              <h4>Full-Stack Development</h4>
              <p>Java/Spring Boot backends with React/Next.js frontends — from RESTful APIs to responsive UIs.</p>
            </div>

            <div className="icard interactive">
              <div className="ic-ico">
                📚
              </div>
              <h4>Educator &amp; Mentor</h4>
              <p>Teaching CS fundamentals, software engineering, system design, and project management at Reliance College.</p>
            </div>

            <div className="icard interactive">
              <div className="ic-ico">
                👥
              </div>
              <h4>Community Leader</h4>
              <p>Past President of Rotaract Club — led 110+ members and organized 26+ impactful community projects.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
