import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle-w" id="theme-toggle">
      <button
        className={`tt-btn interactive ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
        title="Dark mode"
        aria-label="Switch to Dark Mode"
      >
        🌙
      </button>
      <button
        className={`tt-btn interactive ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
        title="Light mode"
        aria-label="Switch to Light Mode"
      >
        ☀️
      </button>
    </div>
  );
};

export default ThemeToggle;
