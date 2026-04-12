import api, { handleTokenRefresh, getTokenRemainingSeconds } from './api';

/**
 * 참여 중인 채팅 채널 목록 조회
 * GET /api/chat/channels
 */
export const getMyChannels = async () => {
  return await api.get('/api/chat/channels');
};

/**
 * 채널 상세 메시지 목록 조회 (커서 기반)
 * GET /api/chat/channels/{id}/messages
 * 
 * @param {number} channelId - 채널 ID
 * @param {number} [beforeId] - 이 메시지 ID 이전의 메시지들 조회 (페이징)
 */
export const getMessages = async (channelId, beforeId) => {
  const params = beforeId ? { beforeId } : {};
  return await api.get(`/api/chat/channels/${channelId}/messages`, { params });
};

/**
 * 메시지 전송
 * POST /api/chat/channels/{id}/messages
 * 
 * @param {number} channelId - 채널 ID
 * @param {string} content - 메시지 내용
 */
export const sendMessage = async (channelId, content) => {
  return await api.post(`/api/chat/channels/${channelId}/messages`, { content });
};

/**
 * 채널 참여 (idempotent)
 * POST /api/chat/channels/{id}/join
 */
export const joinChannel = async (channelId) => {
  return await api.post(`/api/chat/channels/${channelId}/join`);
};

/**
 * 하트비트 (온라인 상태 갱신)
 * POST /api/chat/channels/{id}/heartbeat
 */
export const heartbeat = async (channelId) => {
  return await api.post(`/api/chat/channels/${channelId}/heartbeat`);
};

/**
 * 채널 온라인 인원 수 조회
 * GET /api/chat/channels/{id}/online-count
 */
export const getOnlineCount = async (channelId) => {
  return await api.get(`/api/chat/channels/${channelId}/online-count`);
};

/**
 * 읽음 커서 업데이트
 * PUT /api/chat/channels/{id}/read
 * 
 * @param {number} channelId - 채널 ID
 * @param {number} lastReadMessageId - 마지막으로 읽은 메시지 ID
 */
export const markRead = async (channelId, lastReadMessageId) => {
  return await api.put(`/api/chat/channels/${channelId}/read`, { lastReadMessageId });
};

/**
 * 채널 SSE 구독 URL 생성
 * 브라우저 EventSource 객체에서 사용
 */
/**
 * 채널 SSE 구독 및 메시지 수신 핸들러
 * 
 * @param {number} channelId - 채널 ID
 * @param {function} onMessage - 메시지 수신 시 실행할 콜백
 * @param {function} onError - 에러 발생 시 실행할 콜백
 * @param {function} onConnected - 연결 성공 시 실행할 콜백 (재연결 포함)
 * @returns {function} 구독 중단(Abort) 함수
 */
export const subscribeToMessages = (channelId, onMessage, onError, onConnected) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://d1jum4zzr45u1b.cloudfront.net';
  const url = `${baseURL}/api/chat/channels/${channelId}/subscribe`;
  const abortController = new AbortController();
  
  let reconnectTimeout;
  let isAborted = false;
  let retryCount = 0;

  const subscribe = async () => {
    if (isAborted) return;

    // 매 연결 시 최신 토큰 조회 (클로저 캡처 방지)
    const currentToken = localStorage.getItem('accessToken');

    // 선제적 갱신: 토큰 만료 1분 미만이면 연결 전에 미리 갱신 시도
    const remaining = getTokenRemainingSeconds();
    let tokenToUse = currentToken;
    if (remaining < 60 && remaining > 0 && !isAborted) {
      console.warn(`[SSE] Access token expires in ${Math.round(remaining)}s. Attempting proactive refresh before connecting...`);
      try {
        tokenToUse = await handleTokenRefresh();
      } catch {
        console.warn('[SSE] Proactive refresh failed. Proceeding with current token.');
        tokenToUse = localStorage.getItem('accessToken') || currentToken;
      }
    }

    if (isAborted) return;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
          'Accept': 'text/event-stream',
        },
        signal: abortController.signal,
      });

      if (!response.ok) {
        if (response.status === 401 && !isAborted) {
          console.warn('[SSE] Unauthorized, attempting token refresh...');
          try {
            await handleTokenRefresh();
            return subscribe();
          } catch {
            throw new Error('SSE Auth refresh failed');
          }
        }
        throw new Error(`SSE Connection failed: ${response.status}`);
      }

      // 연결 성공 알림 및 재시도 횟수 초기화
      onConnected && onConnected();
      retryCount = 0;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Incomplete line back to buffer

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;

          const dataStr = trimmedLine.replace('data:', '').trim();
          if (dataStr === 'connected' || dataStr === 'ping') {
            // console.log('SSE status:', dataStr);
            continue;
          }

          try {
            const data = JSON.parse(dataStr);
            onMessage(data);
          } catch (e) {
            if (dataStr.startsWith('{')) {
              console.error('Failed to parse SSE JSON:', e, dataStr);
            }
          }
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError' && !isAborted) {
        retryCount++;
        // Exponential backoff: min 2s, max 30s
        const delay = Math.min(Math.pow(2, retryCount) * 1000, 30000);
        console.warn(`[SSE] Connection interrupted (${error.message || error}). Retrying in ${delay / 1000}s...`);
        
        onError && onError(error);
        reconnectTimeout = setTimeout(subscribe, delay);
      }
    }
  };

  subscribe();

  // Return unsubscribe function
  return () => {
    isAborted = true;
    abortController.abort();
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
  };
};
