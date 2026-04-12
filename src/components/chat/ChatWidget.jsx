import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useDraggable from '../../hooks/useDraggable';
import useResizable from '../../hooks/useResizable';
import * as chatService from '../../services/chat';
import * as userService from '../../services/userService';
import '../../styles/components/chat/ChatWidget.css';

// SVG Icon for floating button (후보 14: 대형 원형 말풍선)
const ChatIcon = ({ size = 24, dotColor = 'var(--primary)' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.003L2 22l5.134-1.334A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    <circle cx="8" cy="12" r="1.5" fill={dotColor} />
    <circle cx="12" cy="12" r="1.5" fill={dotColor} />
    <circle cx="16" cy="12" r="1.5" fill={dotColor} />
  </svg>
);

ChatIcon.propTypes = {
  size: PropTypes.number,
  dotColor: PropTypes.string,
};

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

  // Ref to access latest messages without triggering useEffect re-runs
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // SSE Subscription (Service implementation)
  useEffect(() => {
    if (!channel) return;

    // Reconnection Catch-up logic
    const handleCatchUp = async () => {
      try {
        // Since we don't know exactly when it dropped, 
        // fetching the latest page and merging is the safest way.
        const data = await chatService.getMessages(channel.id);
        if (data && data.messages) {
          setMessages((prev) => {
            const newMsgs = data.messages.filter(
              (m) => !prev.some((p) => p.id === m.id)
            );
            if (newMsgs.length === 0) return prev;
            return [...prev, ...newMsgs].sort((a, b) => a.id - b.id);
          });
        }
      } catch (error) {
        console.error('[Chat] Catch-up failed:', error);
      }
    };

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
      () => {
        // onConnected: Triggered on initial connect AND every successful reconnect
        console.log(`[SSE] Connected to channel ${channel.id}`);
        // If we already have messages, it might be a reconnection catch-up
        if (messagesRef.current.length > 0) {
          handleCatchUp();
        }
      }
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

  const handleClose = () => {
    // Sync button position to popup before closing
    btnDrag.setPosition({
      x: Number(24 - (popupPos.right || 0)) || 0,
      y: Number(24 - (popupPos.bottom || 0)) || 0,
    });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    // Check for Esc key
    if (e.key === 'Escape') {
      e.stopPropagation();
      handleClose();
      return;
    }

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
          className={`chat-floating-btn ${btnDrag.isDragging ? 'dragging' : ''}`}
          style={{
            transform: `translate(${btnDrag.position.x}px, ${btnDrag.position.y}px)`,
          }}
          onMouseDown={btnDrag.handleMouseDown}
          onClick={handleToggle}
          title="Open Global Chat"
        >
          <ChatIcon size={28} />
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
              <div className="chat-header-icon-wrapper">
                <ChatIcon size={34} dotColor="#FFFFFF" />
              </div>
              <div className="chat-header-text">
                <span className="chat-channel-name">실시간 채팅</span>
                <div className="chat-status-indicator">
                  <span className="chat-online-dot" />
                  <span className="chat-online-count">{onlineCount} online</span>
                </div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                type="button"
                className="chat-minimize-btn"
                onClick={handleClose}
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
                  <div className="chat-msg-sender">{isMine ? '나' : msg.senderNickname}</div>
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
