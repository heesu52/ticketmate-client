import { useEffect, useState } from 'react';

import { IMessage } from '@stomp/stompjs';

import {
  connectStomp,
  sendMessage,
  subscribeToTopic,
  unsubscribeFromTopic,
  addConnectionListener,
  removeConnectionListener,
} from '@/shared/utils/services/stomp-client';

const useStomp = <T = unknown>(topic: string, onMessage: (msg: T) => void) => {
  /** 웹소켓 연결 상태 */
  const [isConnected, setIsConnected] = useState(false);
  /** 웹소켓 연결 중 상태 */
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    /** 훅 활성 상태 */
    let active = true;

    console.log('useStomp 훅 시작, topic:', topic);

    /** 연결 상태 리스너 등록 */
    const connectionListener = (connected: boolean, connecting: boolean) => {
      if (active) {
        setIsConnected(connected);
        setIsConnecting(connecting);
      }
    };

    /** 연결 상태 리스너 등록 */
    addConnectionListener(connectionListener);

    /** 웹소켓 연결 */
    connectStomp()
      .then(() => {
        console.log('WebSocket 연결 완료, 구독 시작:', topic);

        subscribeToTopic(topic, (msg: IMessage) => {
          if (active) {
            try {
              const response = JSON.parse(msg.body) as T;

              console.log('파싱된 메시지:', response);

              onMessage(response);
            } catch (e) {
              console.error('Parsing error', e);
            }
          }
        });
      })
      .catch((error) => {
        console.error('WebSocket 연결 실패:', error);
      });

    return () => {
      console.log('useStomp 훅 정리, 구독 취소:', topic);
      active = false;
      removeConnectionListener(connectionListener);
      unsubscribeFromTopic(topic);
    };
  }, [topic]);

  return {
    send: sendMessage,
    isConnected,
    isConnecting,
  };
};

export default useStomp;
