import React from 'react';
import ChatWidget from '../components/chat/ChatWidget';

const ChatPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F5F5', position: 'relative' }}>
      <header style={{ padding: '24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#22262B' }}>
          Chat Widget
        </h1>
        <p style={{ marginTop: '8px', color: '#4B5563', fontSize: '14px' }}>
          실시간 채팅 기능을 확인하는 페이지입니다. 우측 하단의 버튼을 드래그하거나 클릭하여 팝업을 열 수 있습니다.
        </p>
      </header>

      {/* Render the chat widget */}
      <ChatWidget initialUnreadCount={12} />
    </div>
  );
};

export default ChatPage;
