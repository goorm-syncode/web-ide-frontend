import React, { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineFormatListBulleted, MdChevronLeft, MdChevronRight, MdPictureAsPdf } from 'react-icons/md';
import { createRoot } from 'react-dom/client';
import '../../styles/presentation.css';
import slides from './slides';
import logoImg from '../../assets/logo-gnb.png';

const PresentationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const slideParam = parseInt(searchParams.get('slide') || '1', 10);
  const currentIndex = isNaN(slideParam) ? 0 : Math.max(0, Math.min(slideParam - 1, slides.length - 1));
  const isPrintMode = false; // Print mode is now handled via openPrintWindow
  
  const [tocOpen, setTocOpen] = React.useState(false);

  // Sync index to URL just in case of out of bounds or missing param
  useEffect(() => {
    if (!isPrintMode && (isNaN(slideParam) || slideParam < 1 || slideParam > slides.length)) {
      setSearchParams({ slide: currentIndex + 1 }, { replace: true });
    }
  }, [slideParam, currentIndex, setSearchParams, isPrintMode]);

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

  const openPrintWindow = useCallback(() => {
    const printWin = window.open('', '_blank', 'width=1600,height=900');
    if (!printWin) return;

    // Collect all stylesheets from current page
    const styleLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(l => `<link rel="stylesheet" href="${l.href}">`)
      .join('\n');
    const inlineStyles = Array.from(document.querySelectorAll('style'))
      .map(s => `<style>${s.innerHTML}</style>`)
      .join('\n');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Sync Code - Presentation</title>
        ${styleLinks}
        ${inlineStyles}
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; background: #fff; }
          .print-page {
            width: 297mm;
            height: 210mm;
            overflow: hidden;
            page-break-after: always;
            page-break-inside: avoid;
            display: flex;
            flex-direction: column;
            position: relative;
            background: #fff;
          }
          .print-page:last-child { page-break-after: auto; }
          .print-page .slide-wrapper {
            position: relative !important;
            width: 100% !important;
            height: 100% !important;
            opacity: 1 !important;
            transform: none !important;
            display: flex !important;
            flex-direction: column !important;
          }
          @page { size: A4 landscape; margin: 0; }
          @media print {
            html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body id="print-body"></body>
      </html>
    `);
    printWin.document.close();

    printWin.onload = () => {
      const body = printWin.document.getElementById('print-body');
      slides.forEach((slideObj) => {
        const page = printWin.document.createElement('div');
        page.className = 'print-page';
        const wrapper = printWin.document.createElement('div');
        wrapper.className = 'slide-wrapper active';
        page.appendChild(wrapper);
        body.appendChild(page);
        const root = createRoot(wrapper);
        const Comp = slideObj.component;
        root.render(<Comp isActive={true} />);
      });
      setTimeout(() => {
        printWin.focus();
        printWin.print();
      }, 1500);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isPrintMode) return;
      if (e.key === 'ArrowRight' || e.code === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        setTocOpen(false);
      } else if (e.key === 'f' || e.key === 'F' || e.key === 'ㄹ') {
        toggleFullscreen();
      } else if (e.key === 'Home') {
        goToSlide(0);
      } else if (e.key === 'End') {
        goToSlide(slides.length - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, isPrintMode, goToSlide]);

  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div className={`presentation-wrapper ${isPrintMode ? 'print-mode' : ''}`}>
      <div className="slide-container">
        
        {/* Slide Content */}
        <div className="slide-content-area">
          {slides.map((slideObj, index) => {
            let className = "slide-wrapper";
            if (isPrintMode) className += " print-item";
            else {
              if (index === currentIndex) className += " active";
              else if (index < currentIndex) className += " prev";
              else className += " next";
            }

            const SlideComponent = slideObj.component;

            // In print mode, render all. In normal mode, only nearby to optimize? 
            // Actually, keep current logic for normal, but render all for print.
            if (!isPrintMode && Math.abs(index - currentIndex) > 1) return null;

            return (
              <div key={index} className={className}>
                <SlideComponent isActive={isPrintMode || index === currentIndex} />
              </div>
            );
          })}
        </div>

        {(
          <>
            {/* Footer Bar */}
            <div className="slide-footer-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontWeight: 800, color: 'var(--slide-primary)' }}>
                <img src={logoImg} alt="logo" style={{ height: '30px' }} />
                Sync Code
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="slide-navigation">
                <button 
                  className="nav-btn prev" 
                  onClick={prevSlide} 
                  title="이전 (←)" 
                  disabled={currentIndex === 0}
                >
                  <MdChevronLeft />
                </button>
                <div className="slide-number">
                  {currentIndex + 1} / {slides.length}
                </div>
                <button 
                  className="nav-btn next" 
                  onClick={nextSlide} 
                  title="다음 (→, Space)" 
                  disabled={currentIndex === slides.length - 1}
                >
                  <MdChevronRight />
                </button>
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
            {/* Print Button */}
            <button
              onClick={openPrintWindow}
              title="PDF로 내보내기"
              style={{
                position: 'absolute',
                right: '12rem',
                top: '4rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid var(--slide-border)',
                color: 'var(--slide-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                cursor: 'pointer',
                zIndex: 101,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              <MdPictureAsPdf />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PresentationPage;
