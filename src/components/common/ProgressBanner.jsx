import '../../styles/components/ProgressBanner.css';

/**
 * 진행률 및 이어하기 박스 컴포넌트
 * @param {Object} props
 * @param {number} [props.progress=0] - 진행률 (0-100)
 * @param {string} [props.missionTitle] - 이어하기 중인 미션 제목
 * @param {Function} [props.onContinue] - 이어하기 버튼 클릭 핸들러
 * @param {boolean} [props.loading=false] - 로딩 상태 여부
 * @param {string} [props.className=''] - 추가 클래스명
 */
const ProgressBanner = ({ 
  progress = 0, 
  missionTitle = '', 
  onContinue, 
  loading = false, 
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`progress-card loading ${className}`.trim()}>
        <div className="progress-card-info">
          <div className="progress-card-title-skeleton skeleton-shimmer"></div>
          <div className="progress-card-track-skeleton skeleton-shimmer"></div>
        </div>
        <div className="progress-card-btn-box">
          <div className="progress-btn-skeleton skeleton-shimmer"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`progress-card ${className}`.trim()}>
      <div className="progress-card-info">
        <div className="progress-card-detail">
          <div className="progress-card-title-row">
            <span className="progress-card-title">
              {missionTitle && `"${missionTitle}" 이어하기`}
            </span>
            <span className="progress-card-percent">{progress}%</span>
          </div>
          <div className="progress-card-track">
            <div className="progress-card-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      <div className="progress-card-btn-box">
        <button className="progress-continue-btn" onClick={onContinue} disabled={!missionTitle}>
          이어하기
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="progress-continue-icon"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProgressBanner;
