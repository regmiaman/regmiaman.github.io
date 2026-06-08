import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch screens (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setVisible(true);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .interactive')) {
        setHovered(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .interactive')) {
        setHovered(false);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    let animationFrameId;
    const lerp = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      animationFrameId = requestAnimationFrame(lerp);
    };

    lerp();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`cur-dot ${hovered ? 'hov' : ''} ${clicked ? 'clk' : ''}`}
      />
      <div 
        ref={ringRef} 
        className={`cur-ring ${hovered ? 'hov' : ''} ${clicked ? 'clk' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
