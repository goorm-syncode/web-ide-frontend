/* eslint-disable react/prop-types */
import React from 'react';
import '../../../styles/presentation.css';

export const SlideLayout = ({ title, subtitle, children }) => (
  <div style={{ padding: '0 1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div className="slide-title-area">
      <h1 className="slide-title">{title}</h1>
      {subtitle && <h2 className="slide-subtitle">{subtitle}</h2>}
    </div>
    <div className="slide-body">
      {children}
    </div>
  </div>
);

export const SlideCard = ({ title, icon, children, style, ...props }) => (
  <div className="slide-card" style={style} {...props}>
    {title && (
      <div className="slide-card-title">
        {icon && <span className="infographic-icon" style={{ fontSize: '3.5rem', marginBottom: 0 }}>{icon}</span>}
        {title}
      </div>
    )}
    <div className="slide-card-text" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  </div>
);

export const MetricCard = ({ value, label, style }) => (
  <div className="metric-card" style={style}>
    <div className="metric-value">{value}</div>
    <div className="metric-label">{label}</div>
  </div>
);

export const Badge = ({ children, variant = 'primary', style }) => (
  <span className={`slide-badge ${variant}`} style={style}>
    {children}
  </span>
);

export const InfoNode = ({ icon, label, desc, color = 'var(--slide-primary)', style }) => (
  <div className="infographic-node" style={{ ...style }}>
    <div className="infographic-icon" style={{ color: color }}>{icon}</div>
    <div className="infographic-label" style={{ color: color }}>{label}</div>
    {desc && <div className="infographic-desc">{desc}</div>}
  </div>
);

export const Connector = ({ direction = 'right', style }) => {
  const rotation = direction === 'right' ? 0 : direction === 'down' ? 90 : direction === 'left' ? 180 : -90;
  return (
    <div className="connector-line" style={{ transform: `rotate(${rotation}deg)`, ...style }} />
  );
};

export const Arrow = ({ style }) => (
  <div style={{
    fontSize: '3rem',
    color: 'var(--slide-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  }}>
    ➔
  </div>
);

export const Grid = ({ children, gap = '3rem', cols = 3, style }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: gap,
    width: '100%',
    ...style
  }}>
    {children}
  </div>
);
