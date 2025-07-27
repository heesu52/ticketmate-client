import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from 'react';

import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { getCookie } from 'cookies-next';
import SockJS from 'sockjs-client';

interface WebSocketContextValue {
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (
    destination: string,
    body: unknown,
    headers?: Record<string, string>,
  ) => void;
  subscribe: <T>(topic: string, callback: (msg: T) => void) => void;
  unsubscribe: (topic: string) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const stompClientRef = useRef<Client | null>(null);
  const subscriptions = useRef<Map<string, StompSubscription>>(new Map());
  const connectPromiseRef = useRef<Promise<void> | null>(null);
  /**
   * 웹소켓 연결
   * @returns {Promise<void>} 웹소켓 연결 상태
   */
  const connect = async (): Promise<void> => {
    if (stompClientRef.current?.connected) return;

    // 연결 중이면 기존 Promise 반환
    if (connectPromiseRef.current) return connectPromiseRef.current;

    setIsConnecting(true);

    const connectPromise = new Promise<void>((resolve, reject) => {
      const client = new Client({
        webSocketFactory: () => new SockJS(`https://api.ticketmate.site/chat`),
        connectHeaders: {
          Authorization: (() => {
            const port =
              typeof window !== 'undefined' ? window.location.port : '';

            let accessToken;

            if (process.env.NODE_ENV === 'development') {
              if (port === '3000') {
                accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_3000;
              } else if (port === '3001') {
                accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_3001;
              } else {
                accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
              }
            } else {
              accessToken = getCookie('accessToken') as string;
            }

            return `Bearer ${accessToken}`;
          })(),
        },
        onConnect: () => {
          setIsConnected(true);
          setIsConnecting(false);
          connectPromiseRef.current = null;
          console.log('웹소켓 연결 성공');
          resolve();
        },
        onStompError: (frame) => {
          console.error('STOMP error', frame);
          setIsConnecting(false);
          connectPromiseRef.current = null;
          reject(new Error('웹소켓 연결 실패'));
        },
        onWebSocketClose: () => {
          setIsConnected(false);
          setIsConnecting(false);
          connectPromiseRef.current = null;
        },
        debug: (msg) => console.log('[STOMP]', msg),
      });

      stompClientRef.current = client;
      client.activate();
    });

    connectPromiseRef.current = connectPromise;
    return connectPromise;
  };

  const disconnect = () => {
    stompClientRef.current?.deactivate();
    stompClientRef.current = null;
    connectPromiseRef.current = null;
    subscriptions.current.clear();
    setIsConnected(false);
    setIsConnecting(false);
  };

  /**
   * 웹소켓 메시지 전송
   * @param {string} destination 메시지 전송 대상 토픽
   * @param {unknown} body 메시지 내용
   * @param {Record<string, string>} headers 메시지 헤더
   * @returns {void}
   */
  const sendMessage = useCallback(
    (destination: string, body: unknown, headers?: Record<string, string>) => {
      // 웹소켓 연결 상태 확인
      if (!stompClientRef.current?.connected) return;

      // 메시지 전송
      stompClientRef.current.publish({
        destination,
        body: JSON.stringify(body),
        headers,
      });
    },
    [stompClientRef],
  );

  /**
   * 웹소켓 구독
   * @param {string} topic 구독 토픽
   * @param {function} callback 콜백 함수
   * @returns {void}
   */
  const subscribe = useCallback(
    <T,>(topic: string, callback: (msg: T) => void) => {
      // 웹소켓 연결 상태 확인
      if (!stompClientRef.current?.connected) return;

      // 이미 구독한 토픽인 경우 중복 구독 방지
      if (subscriptions.current.has(topic)) return;

      console.log('웹소켓 구독 시작', topic);

      const sub = stompClientRef.current.subscribe(topic, (msg: IMessage) => {
        try {
          const response = JSON.parse(msg.body) as T;

          console.log('웹소켓 메시지 수신', response);

          callback(response);
        } catch (e) {
          console.error('Parsing error', e);
        }
      });
      subscriptions.current.set(topic, sub);
    },
    [subscriptions],
  );

  /**
   * 웹소켓 구독 취소
   * @param {string} topic 구독 토픽
   * @returns {void}
   */
  const unsubscribe = useCallback(
    (topic: string) => {
      const sub = subscriptions.current.get(topic);

      if (sub) {
        sub.unsubscribe();
        subscriptions.current.delete(topic);

        console.log('웹소켓 구독 취소', topic);
      }
    },
    [subscriptions],
  );

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        isConnecting,
        connect,
        disconnect,
        sendMessage,
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error('WebSocketContext not found');
  return ctx;
};
