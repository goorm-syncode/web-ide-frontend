import React, { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import '../../styles/presentation.css';
import slides from './slides';
import logoImg from '../../assets/logo-gnb.png';

const PresentationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const slideParam = parseInt(searchParams.get('slide') || '1', 10);
  const currentIndex = isNaN(slideParam) ? 0 : Math.max(0, Math.min(slideParam - 1, slides.length - 1));
  
  const [tocOpen, setTocOpen] = React.useState(false);

  // Sync index to URL just in case of out of bounds or missing param
  useEffect(() => {
    if (isNaN(slideParam) || slideParam < 1 || slideParam > slides.length) {
      setSearchParams({ slide: currentIndex + 1 }, { replace: true });
    }
  }, [slideParam, currentIndex, setSearchParams]);

  const goToSlide = useCallback((index) => {
    const newSlide = Math.max(0, Math.min(index, slides.length - 1));
    setSearchParams({ slide: newSlide + 1 }, { replace: true });
  }, [setSearchParams]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        setTocOpen(false);
      } else if (e.key === 'f' || e.key === 'F' || e.key === 'ㄹ') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen]);

  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div className="presentation-wrapper">
      <div className="slide-container">
        
        {/* Slide Content */}
        <div className="slide-content-area">
          {slides.map((slideObj, index) => {
            let className = "slide-wrapper";
            if (index === currentIndex) className += " active";
            else if (index < currentIndex) className += " prev";
            else className += " next";

            const SlideComponent = slideObj.component;

            return (
              <div key={index} className={className}>
                <SlideComponent isActive={index === currentIndex} />
              </div>
            );
          })}
        </div>

        {/* Footer Bar */}
        <div className="slide-footer-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontWeight: 800, color: 'var(--slide-primary)' }}>
            <img src={logoImg} alt="logo" style={{ height: '30px' }} />
            Sync Code
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="slide-number">
            {currentIndex + 1} / {slides.length}
          </div>
        </div>

        {/* Table of Contents Toggle */}
        <button 
          className="toc-toggle-btn" 
          onClick={() => setTocOpen(!tocOpen)}
          title="목차 토글"
        >
          <MdOutlineFormatListBulleted />
        </button>

        {/* TOC Overlay Backdrop */}
        {tocOpen && (
          <div 
            className="toc-backdrop" 
            onClick={() => setTocOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 999,
              background: 'rgba(0,0,0,0.1)',
              backdropFilter: 'blur(2px)'
            }}
          />
        )}

        {/* TOC Overlay */}
        <div className={`toc-overlay ${tocOpen ? 'open' : ''}`} style={{ zIndex: 1000 }}>
          <div className="toc-title">목차 (Table of Contents)</div>
          <ul className="toc-list">
            {slides.map((slide, index) => (
              <li 
                key={index} 
                className={`toc-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  goToSlide(index);
                  setTocOpen(false);
                }}
              >
                {index + 1}. {slide.title || `Slide ${index + 1}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PresentationPage;
