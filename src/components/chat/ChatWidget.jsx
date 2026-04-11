import React, { useState, useEffect, useRef } from 'react';
import useDraggable from '../../hooks/useDraggable';
import useResizable from '../../hooks/useResizable';
import * as chatService from '../../services/chat';
import * as userService from '../../services/userService';
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

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const maxCharCount = 300;
  const heartbeatInterval = 30000; // 30 seconds

  // hooks
  const btnDrag = useDraggable();
  const { size, position: popupPos, setPosition: setPopupPos, onResizeStart } = useResizable();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Initialize: User, Channel, Messages
  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true);
        // 1. Get current user
        const userData = await userService.getCurrentUser();
        setCurrentUser(userData);

        // 2. Get joined channels
        let channels = await chatService.getMyChannels();
        console.log('Initially joined channels:', channels);

        let targetChannel =
          channels.find((c) => c.name?.toLowerCase().includes('general')) || channels[0];

        // 3. If no channel joined, try to join global (assume ID 1 for MVP)
        if (!targetChannel) {
          console.log('No joined channels found. Attempting to join global channel (ID: 1)...');
          try {
            await chatService.joinChannel(1);
            // Refresh channel list or just try to get this specific channel if ID is known
            // Since there's no getChannelById, we re-fetch the list
            channels = await chatService.getMyChannels();
            targetChannel = channels.find((c) => c.id === 1) || channels[0];
          } catch (joinError) {
            console.error('Failed to join channel 1:', joinError);
          }
        }

        if (targetChannel) {
          console.log('Selected channel:', targetChannel);
          setChannel(targetChannel);

          // 4. Load initial messages
          const messageData = await chatService.getMessages(targetChannel.id);
          setMessages(messageData.messages || []);
        } else {
          console.warn('Could not identify any chat channel to join.');
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, []);

  // SSE Subscription (Service implementation)
  useEffect(() => {
    if (!channel) return;

    const unsubscribe = chatService.subscribeToMessages(
      channel.id,
      (newMessage) => {
        setMessages((prev) => {
          if (prev.some((msg) => msg.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });

        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
        } else {
          chatService.markRead(channel.id, newMessage.id);
        }
      },
      (_error) => {
        // Optional: Show status or error in UI
      },
    );

    return () => {
      unsubscribe();
    };
  }, [channel, isOpen]);

  // Heartbeat & Online Count Polling
  useEffect(() => {
    if (!channel) return;

    const poll = async () => {
      try {
        await chatService.heartbeat(channel.id);
        const data = await chatService.getOnlineCount(channel.id);
        setOnlineCount(data.onlineCount || 0);
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    poll(); // Initial poll
    const timer = setInterval(poll, heartbeatInterval);
    return () => clearInterval(timer);
  }, [channel]);

  // Format relative time helper
  const formatTime = (dateString) => {
    if (!dateString) return '';

    // Ensure the date string is interpreted as UTC if no timezone is specified
    let isoString = dateString;
    if (!isoString.includes('Z') && !isoString.includes('+')) {
      isoString += 'Z';
    }

    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;
    return date.toLocaleDateString();
  };

  const handleToggle = () => {
    // Prevent toggling if it was a drag action
    if (!btnDrag.dragged) {
      if (!isOpen) {
        // Mark as read when opening
        if (channel && messages.length > 0) {
          chatService.markRead(channel.id, messages[messages.length - 1].id);
          setUnreadCount(0);
        }
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

  const handleSendMessage = async () => {
    if (!inputText.trim() || !channel || isSending) return;

    try {
      setIsSending(true);
      await chatService.sendMessage(channel.id, inputText.trim());
      setInputText('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('메시지 전송에 실패했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    // Check if it's the Enter key and not during IME composition
    if (e.key === 'Enter' && !e.shiftKey && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      handleSendMessage();
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
          {!channel && !isLoading && (
            <div className="chat-error-warn" title="No chat channel found">
              !
            </div>
          )}
          {unreadCount > 0 && (
            <div className="chat-unread-badge">{unreadCount > 999 ? '999+' : unreadCount}</div>
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
              <span className="chat-channel-name">실시간 채팅</span>
              <div className="chat-status-indicator">
                <span className="chat-online-dot" />
                <span className="chat-online-count">{onlineCount} online</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                type="button"
                className="chat-minimize-btn"
                onClick={() => {
                  // Sync button position to popup before closing
                  btnDrag.setPosition({
                    x: Number(24 - popupPos.right) || 0,
                    y: Number(24 - popupPos.bottom) || 0,
                  });
                  setIsOpen(false);
                }}
                title="최소화"
              >
                <ChevronDownIcon />
              </button>
            </div>
          </div>

          <div className="chat-tabs">
            <div className="chat-tab">Global</div>
          </div>

          <div className="chat-msg-list" ref={scrollRef}>
            {isLoading && <div className="chat-loading">Loading...</div>}
            {messages.map((msg) => {
              const isMine = currentUser && msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`chat-msg-row ${isMine ? 'mine' : 'other'}`}>
                  <div className="chat-msg-sender">{msg.senderNickname}</div>
                  <div className="chat-msg-content-wrapper">
                    {isMine && <span className="chat-msg-time">{formatTime(msg.createdAt)}</span>}
                    <div className="chat-msg-bubble">{msg.content}</div>
                    {!isMine && <span className="chat-msg-time">{formatTime(msg.createdAt)}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="chat-input-box"
                placeholder="메시지를 입력하세요"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <span className="chat-char-counter">
                {inputText.length}/{maxCharCount}
              </span>
            </div>
            <button
              type="button"
              className="chat-send-btn"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || !channel || isSending}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
