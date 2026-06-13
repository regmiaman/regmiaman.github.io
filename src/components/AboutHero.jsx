import React from 'react';
import { Brain, Target, Users, Heart } from 'lucide-react';
import './AboutHero.css';

const AboutHero = () => {
  const badges = [
    {
      id: 'top-left',
      icon: <Brain size={20} />,
      label: 'Leadership & Mindset',
      position: 'top-left',
      delay: 0
    },
    {
      id: 'top-right',
      icon: <Target size={20} />,
      label: 'Impact Focused',
      position: 'top-right',
      delay: 0.15
    },
    {
      id: 'bottom-left',
      icon: <Users size={20} />,
      label: 'Social Worker',
      position: 'bottom-left',
      delay: 0.3
    },
    {
      id: 'bottom-right',
      icon: <Heart size={20} />,
      label: 'Serving Social Cause',
      position: 'bottom-right',
      delay: 0.45
    }
  ];

  return (
    <div className="about-hero-section">
      <div className="about-hero-container">
        {/* Central Image */}
        <div className="hero-image-wrapper">
          <img 
            src="files/profile.jpg" 
            alt="Profile" 
            className="hero-image"
          />
          
          {/* Corner Badges */}
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`corner-badge corner-${badge.position}`}
              style={{ '--delay': `${badge.delay}s` }}
            >
              <div className="badge-icon">
                {badge.icon}
              </div>
              <div className="badge-label">
                {badge.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">4+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">26+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">110+</span>
            <span className="stat-label">Members Led</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
