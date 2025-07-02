import { Client, type IMessage, StompSubscription } from '@stomp/stompjs';
import { getCookie } from 'cookies-next';
import SockJS from 'sockjs-client';

/** 웹소켓 클라이언트 */
let stompClient: Client | null = null;
/** 웹소켓 연결 상태 */
let isConnected = false;

/** 웹소켓 구독 목록 */
const subscriptions = new Map<string, StompSubscription>();

/**
 * 웹소켓 클라이언트 연결
 * @returns {Promise<Client>} 웹소켓 클라이언트
 */
export const connectStomp = (): Promise<Client> => {
  // 이미 연결되어 있으면 기존 클라이언트 반환
  if (stompClient && isConnected) {
    return Promise.resolve(stompClient);
  }

  // 임시 토큰 및 유저 아이디
  const port = typeof window !== 'undefined' ? window.location.port : '';

  return new Promise((resolve, reject) => {
    stompClient = new Client({
      webSocketFactory: () => new SockJS(`https://api.ticketmate.site/chat`),
      connectHeaders: {
        Authorization: (() => {
          let accessToken;

          // 개발 환경 추후 삭제 예정
          if (process.env.NODE_ENV === 'development') {
            if (port === '3000') {
              accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_3000;
            } else if (port === '3001') {
              accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_3001;
            } else {
              accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
            }
          } else if (process.env.NODE_ENV === 'production') {
            // 프로덕션 환경
            accessToken = getCookie('accessToken') as string;
          }

          return `Bearer ${accessToken}`;
        })(),
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: () => {
        isConnected = true;
        resolve(stompClient!);
      },
      onStompError: (frame) => {
        console.error('Broker error:', frame);
        reject(new Error('STOMP connection failed'));
      },
    });

    stompClient.onWebSocketClose = () => {
      isConnected = false;
    };

    stompClient.activate();
  });
};

/**
 * 웹소켓 구독
 * @param {string} topic 구독 토픽
 * @param {function} callback 콜백 함수
 */
export const subscribeToTopic = (
  topic: string,
  callback: (message: IMessage) => void,
) => {
  if (!stompClient || !isConnected) return;

  if (subscriptions.has(topic)) return;

  const subscription = stompClient.subscribe(topic, callback);
  subscriptions.set(topic, subscription);
};

/**
 * 웹소켓 구독 취소
 * @param {string} topic 구독 토픽
 */
export const unsubscribeFromTopic = (topic: string) => {
  const sub = subscriptions.get(topic);
  if (sub) {
    sub.unsubscribe();
    subscriptions.delete(topic);
  }
};

/**
 * 웹소켓 메시지 전송
 * @param {string} destination 목적지
 * @param {unknown} body 메시지 본문
 * @param {Record<string, string>} [headers] 메시지 헤더 (선택사항)
 */
export const sendMessage = (
  destination: string,
  body: unknown,
  headers?: Record<string, string>,
) => {
  if (!stompClient || !isConnected) return;

  stompClient.publish({
    destination,
    body: JSON.stringify(body),
    headers,
  });
};

/** 웹소켓 연결 종료 */
export const disconnectStomp = () => {
  if (stompClient && isConnected) {
    stompClient.deactivate();
    isConnected = false;
    subscriptions.clear();
  }
};
