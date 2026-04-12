import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/home/ProgressBanner.css';
import frame1 from '../../assets/runcat/frame_0001.png';
import frame2 from '../../assets/runcat/frame_0002.png';
import frame3 from '../../assets/runcat/frame_0003.png';
import frame4 from '../../assets/runcat/frame_0004.png';
import frame5 from '../../assets/runcat/frame_0005.png';

/**
 * 런캣 스타일의 프레임 애니메이션 러너
 */
const RunCat = ({ progress }) => {
  // 진행률에 따라 애니메이션 속도(초) 계산 (낮을수록 빠름)
  const duration = Math.max(0.15, 1.0 - (progress / 100) * 0.85);

  // 런캣 공식 5프레임 (픽셀 아트 스타일 실루엣)
  const frames = [frame1, frame2, frame3, frame4, frame5];

  return (
    <div 
      className="runcat-container" 
      style={{ 
        left: `${progress}%`,
        '--ani-duration': `${duration}s`
      }}
    >
      <div className="runcat-viewport">
        <div className="runcat-sprite">
          {frames.map((src, i) => (
            <div 
              key={i} 
              className={`runcat-frame frame-${i+1}`} 
              style={{ '--mask-image': `url(${src})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

RunCat.propTypes = {
  progress: PropTypes.number.isRequired,
};

/**
 * 진행률 및 이어하기 배너 컴포넌트
 * @param {Object} props
 * @param {number} [props.progress=0] - 진행률 (0-100)
 * @param {Function} [props.onContinue] - 이어하기 버튼 클릭 핸들러
 * @param {string} [props.className=''] - 추가 클래스명
 */
const ProgressBanner = ({ progress = 0, onContinue, className = '' }) => {
  return (
    <div className={`progress-banner ${className}`.trim()}>
      <div className="progress-section">
        <div className="progress-track">
          <RunCat progress={progress} />
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
      <button className="progress-continue-btn" onClick={onContinue}>
        이어하기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="progress-continue-icon"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

ProgressBanner.propTypes = {
  progress: PropTypes.number,
  onContinue: PropTypes.func,
  className: PropTypes.string,
};

export default ProgressBanner;
