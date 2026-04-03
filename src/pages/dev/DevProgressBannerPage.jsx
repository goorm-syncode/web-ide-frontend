import { useState } from 'react';
import ProgressBanner from '../../components/common/ProgressBanner';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import '../../styles/components/Card.css';

const DevProgressBannerPage = () => {
  // Just dummy state for demo
  const [demoProgress, setDemoProgress] = useState(65);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>
        Progress Banner & Resume Button UI
      </h1>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#475569' }}>
          1. Progress Banner (Top Header Area)
        </h2>
        <ProgressBanner 
          progress={demoProgress} 
          onContinue={() => alert(`Continue from ${demoProgress}%`)} 
        />
        <div style={{ marginTop: '16px' }}>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={demoProgress} 
            onChange={(e) => setDemoProgress(Number(e.target.value))}
            style={{ width: '240px' }}
          />
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#475569' }}>
          2. "Resume Session" Button (Problem Card)
        </h2>
        <Card title="Algorithm Problem #123" style={{ width: '320px', backgroundColor: '#ffffff' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Currently in progress. Click below to continue solving.
          </p>
          <Button 
            primary 
            fullWidth 
            onClick={() => alert('Resume Session')}
            style={{ backgroundColor: '#4f46e5', fontWeight: '600', padding: '12px 16px', height: 'auto', fontSize: '16px' }}
          >
            이어하기
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default DevProgressBannerPage;
