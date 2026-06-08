import { useState, useEffect } from 'react';

const useScrollSpy = (sectionIds, offset = 150) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      let currentActive = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollPosition >= top) {
            currentActive = sectionIds[i];
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
};

export default useScrollSpy;
