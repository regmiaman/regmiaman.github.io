import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './InfiniteCarousel.css';

const InfiniteCarousel = ({ items = [] }) => {
  const [perView, setPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Update perView count on window resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 600) setPerView(1);
      else if (w < 960) setPerView(2);
      else setPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = items.length;
  if (total === 0) return null;

  // We clone slides at the start and end to achieve a seamless loop.
  // We need to render: [Clones of last slides] + [Original slides] + [Clones of first slides]
  // The number of clones at each side is equal to `perView`.
  const clonesStart = items.slice(-perView);
  const clonesEnd = items.slice(0, perView);
  const extendedItems = [...clonesStart, ...items, ...clonesEnd];

  // The active index relative to the extended array starts at `perView`
  const virtualIndex = currentIndex + perView;

  // Auto-play timer
  useEffect(() => {
    if (isPaused) {
      clearInterval(autoPlayRef.current);
    } else {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isPaused, currentIndex, perView]);

  const handleNext = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Check boundaries after transition completes
  const handleTransitionEnd = () => {
    if (currentIndex >= total) {
      // Snap to the beginning instantly (turn off transitions)
      setIsTransitioning(false);
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      // Snap to the end instantly
      setIsTransitioning(false);
      setCurrentIndex(total - 1);
    }
  };

  // Re-enable transition after snapping index
  useEffect(() => {
    if (!isTransitioning) {
      // Force repaint to make sure the snap happens without animation
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        const offset = -virtualIndex * (100 / perView);
        trackRef.current.style.transform = `translateX(${offset}%)`;
        // Trigger reflow
        trackRef.current.offsetHeight;
      }
      setIsTransitioning(true);
    }
  }, [isTransitioning, virtualIndex, perView]);

  // Dots navigation
  const goToOriginalIndex = (idx) => {
    setCurrentIndex(idx);
  };

  const activeDot = ((currentIndex % total) + total) % total;

  // Calculate percentage shift
  const translateValue = -virtualIndex * (100 / perView);

  return (
    <div 
      className="infinite-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-viewport">
        <div 
          ref={trackRef}
          className="carousel-track"
          style={{
            transform: `translateX(${translateValue}%)`,
            transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.map((item, index) => (
            <div 
              key={index} 
              className="carousel-slide" 
              style={{ width: `${100 / perView}%` }}
            >
              <div className="slide-content">
                <img src={item.src} alt={item.caption || "Portfolio slide"} />
                {item.caption && (
                  <div className="slide-caption-overlay">
                    <p>{item.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button 
          className="carousel-btn prev interactive" 
          onClick={handlePrev} 
          aria-label="Previous slide"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot interactive ${activeDot === i ? 'active' : ''}`}
              onClick={() => goToOriginalIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button 
          className="carousel-btn next interactive" 
          onClick={handleNext} 
          aria-label="Next slide"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
