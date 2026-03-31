import { useState } from 'react';
import Button from '../../components/common/Button';

const DevButtonPage = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAsyncClick = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((c) => c + 1);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Dev: Button Component</h1>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
        <Button type="primary" onClick={() => setCount(count + 1)}>
          Primary: {count}
        </Button>
        <Button primary fullWidth>
          Primary Full Width
        </Button>
        <Button type="secondary" onClick={() => alert('Secondary Clicked')}>
          Secondary
        </Button>
        <Button type="danger" onClick={() => alert('Danger Clicked')}>
          Danger
        </Button>
        <Button type="primary" loading={loading} onClick={handleAsyncClick}>
          Loading Test
        </Button>
        <Button type="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
};

export default DevButtonPage;
