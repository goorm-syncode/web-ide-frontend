import React from 'react';
import ChatWidget from '../../components/chat/ChatWidget';

const DevChatWidgetPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F5F5', position: 'relative' }}>
      <header style={{ padding: '24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#22262B' }}>
          ChatWidget Component Dev Sandbox
        </h1>
        <p style={{ marginTop: '8px', color: '#4B5563', fontSize: '14px' }}>
          Drag the floating button below, and click it to open the popup. The popup header is also draggable.
        </p>
      </header>

      {/* Render the chat widget */}
      <ChatWidget initialUnreadCount={12} />
    </div>
  );
};

export default DevChatWidgetPage;
