import Card from '../../components/common/Card';

const DevCardPage = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Dev: Card Component</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '24px' }}>
        <Card title="Simple Card">
          This is a simple card with a title and content.
        </Card>
        <Card title="Hoverable Card" hoverable onClick={() => alert('Card clicked!')}>
          This card has a hover effect and an onClick handler. Try hovering and clicking!
        </Card>
        <Card>
          This is a card without a title. It only shows the content.
        </Card>
        <Card title="Custom Styled Card" className="custom-card" style={{ border: '2px solid #6366F1' }}>
          You can still pass custom styles or class names if needed.
        </Card>
      </div>
    </div>
  );
};

export default DevCardPage;
