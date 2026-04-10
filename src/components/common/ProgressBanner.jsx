import '../../styles/components/ProgressBanner.css';

/**
 * 진행률 및 이어하기 배너 컴포넌트
 * @param {Object} props
 * @param {number} [props.progress=0] - 진행률 (0-100)
 * @param {Function} [props.onContinue] - 이어하기 버튼 클릭 핸들러
 * @param {boolean} [props.loading=false] - 로딩 상태 여부
 * @param {string} [props.className=''] - 추가 클래스명
 */
const ProgressBanner = ({ progress = 0, onContinue, loading = false, className = '' }) => {
  if (loading) {
    return (
      <div className={`progress-banner loading ${className}`.trim()}>
        <div className="progress-section">
          <div className="progress-track skeleton-shimmer"></div>
          <div className="progress-text-skeleton skeleton-shimmer"></div>
        </div>
        <div className="progress-btn-skeleton skeleton-shimmer"></div>
      </div>
    );
  }

  return (
    <div className={`progress-banner ${className}`.trim()}>
      <div className="progress-section">
        <div className="progress-track">
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

export default ProgressBanner;
