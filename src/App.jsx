import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import Button from './components/common/Button';
import Input from './components/common/Input';
import Card from './components/common/Card';

function App() {
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
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>Common Button Component Test</p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '24px',
            flexWrap: 'wrap',
          }}
        >
          <Button type="primary" onClick={() => setCount(count + 1)}>
            Primary: {count}
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

        <div
          style={{
            marginTop: '48px',
            textAlign: 'left',
            width: '100%',
            maxWidth: '300px',
            margin: '48px auto 0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <h3 style={{ margin: 0, padding: 0 }}>Input Component Test</h3>
          <Input placeholder="Default Input" />
          <Input placeholder="With helper text" helperText="This is a helper" />
          <Input placeholder="Error State" error helperText="This is an error" />
          <Input placeholder="Disabled Input" disabled value="Cannot edit this" />
        </div>

        <div
          style={{
            marginTop: '48px',
            textAlign: 'left',
            width: '100%',
            maxWidth: '600px',
            margin: '48px auto 0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <h3 style={{ margin: 0, padding: 0 }}>Card Component Test</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
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
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
