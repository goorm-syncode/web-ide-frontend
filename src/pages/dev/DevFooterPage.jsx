import Footer from '../../components/layout/Footer';
import '../../styles/pages/DevFooterPage.css';

const DevFooterPage = () => {
  return (
    <div className="dev-footer-page-container">
      <div className="dev-footer-page-content">
        <h1>Footer Component Dev Page</h1>
        <p>This page is for testing the Footer component.</p>
        <p>The Footer should always stick to the bottom of the flex container.</p>
      </div>

      {/* 실제 테스트할 컴포넌트 */}
      <Footer />
    </div>
  );
};

export default DevFooterPage;
