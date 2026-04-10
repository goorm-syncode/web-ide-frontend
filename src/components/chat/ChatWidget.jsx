import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useDraggable from '../../hooks/useDraggable';
import useResizable from '../../hooks/useResizable';
import '../../styles/components/chat/ChatWidget.css';

// SVG Icon for floating button
const ChatIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

// Chevron Down Icon for minimize
const ChevronDownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Paper Plane Send Icon
const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const ChatWidget = ({ initialUnreadCount = 3 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const maxCharCount = 300;

  // hooks
  const btnDrag = useDraggable();
  const { size, position: popupPos, setPosition: setPopupPos, onResizeStart } = useResizable();
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Mock messages with relative time and Korean "나"
  const messages = [
    {
      id: 1,
      sender: 'Alice (System)',
      text: '안녕하세요! 반갑습니다. 공지사항을 확인해 주세요.',
      time: '10분 전',
      isMine: false,
    },
    {
      id: 2,
      sender: 'Bob21',
      text: '모두 즐거운 공부 되세요! 같이 화이팅해요.',
      time: '3분 전',
      isMine: false,
    },
    {
      id: 3,
      sender: '나',
      text: '안녕하세요 Bob님, 반갑습니다. 다음에 또 만나요. 어서오세요. 네. 맞습니다. 그렇군요. 알겠습니다.',
      time: '방금 전',
      isMine: true,
    },
  ];

  const handleToggle = () => {
    // Prevent toggling if it was a drag action
    if (!btnDrag.dragged) {
      if (!isOpen) {
        // Sync popup position to button before opening with viewport clamping
        const targetBottom = 24 - btnDrag.position.y;
        const targetRight = 24 - btnDrag.position.x;

        // Ensure it doesn't go off screen (0 is bottom/right edge, viewport - offset is top/left edge)
        const clampedBottom = Math.max(0, Math.min(window.innerHeight - size.height, targetBottom));
        const clampedRight = Math.max(0, Math.min(window.innerWidth - size.width, targetRight));

        setPopupPos({
          bottom: clampedBottom,
          right: clampedRight,
        });
      } else {
        // Sync button position to popup before closing
        btnDrag.setPosition({
          x: 24 - popupPos.right,
          y: 24 - popupPos.bottom,
        });
      }
      setIsOpen((prev) => !prev);
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setInputText(text);
    }
  };

  return (
    <div className="chat-widget-wrapper">
      {/* Floating Button - Visible only when NOT open */}
      {!isOpen && (
        <button
          type="button"
          className="chat-floating-btn"
          style={{
            transform: `translate(${btnDrag.position.x}px, ${btnDrag.position.y}px)`,
          }}
          onMouseDown={btnDrag.handleMouseDown}
          onClick={handleToggle}
          title="Open Global Chat"
        >
          <ChatIcon />
          {initialUnreadCount > 0 && (
            <div className="chat-unread-badge">
              {initialUnreadCount > 999 ? '999+' : initialUnreadCount}
            </div>
          )}
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div
          className="chat-popup-container"
          style={{
            width: size.width,
            height: size.height,
            bottom: popupPos.bottom,
            right: popupPos.right,
          }}
        >
          {/* Resize Handles */}
          <div className="resize-handle n" onMouseDown={(e) => onResizeStart(e, 'n')} />
          <div className="resize-handle s" onMouseDown={(e) => onResizeStart(e, 's')} />
          <div className="resize-handle e" onMouseDown={(e) => onResizeStart(e, 'e')} />
          <div className="resize-handle w" onMouseDown={(e) => onResizeStart(e, 'w')} />
          <div className="resize-handle nw" onMouseDown={(e) => onResizeStart(e, 'nw')} />
          <div className="resize-handle ne" onMouseDown={(e) => onResizeStart(e, 'ne')} />
          <div className="resize-handle sw" onMouseDown={(e) => onResizeStart(e, 'sw')} />
          <div className="resize-handle se" onMouseDown={(e) => onResizeStart(e, 'se')} />

          {/* Header */}
          <div
            className="chat-popup-header"
            onMouseDown={(e) => onResizeStart(e, 'move')}
            style={{ cursor: 'grab' }}
          >
            <div className="chat-header-info">
              <span className="chat-channel-name">Global Chat</span>
              <div className="chat-status-indicator">
                <span className="chat-online-dot" />
                <span className="chat-online-count">12 online</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                type="button"
                className="chat-minimize-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize"
              >
                <ChevronDownIcon />
              </button>
            </div>
          </div>

          <div className="chat-tabs">
            <div className="chat-tab">Global</div>
          </div>

          <div className="chat-msg-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg-row ${msg.isMine ? 'mine' : 'other'}`}>
                <div className="chat-msg-sender">{msg.sender}</div>
                <div className="chat-msg-content-wrapper">
                  {msg.isMine && <span className="chat-msg-time">{msg.time}</span>}
                  <div className="chat-msg-bubble">{msg.text}</div>
                  {!msg.isMine && <span className="chat-msg-time">{msg.time}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="chat-input-box"
                placeholder="메시지를 입력하세요..."
                value={inputText}
                onChange={handleInputChange}
              />
              <span className="chat-char-counter">
                {inputText.length}/{maxCharCount}
              </span>
            </div>
            <button type="button" className="chat-send-btn">
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ChatWidget.propTypes = {
  initialUnreadCount: PropTypes.number,
};

export default ChatWidget;
