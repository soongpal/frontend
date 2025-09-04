//채팅관련 store

import { create } from 'zustand';
import { Client, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { type ChatMessage } from '../types/chat';

// 스토어 상태 및 액션 타입 정의
interface ChatState {
  client: Client | null;    //사용자
  isConnected: boolean; //연결 여부
  messages: Map<number, ChatMessage[]>; // Key: roomId, Value: 메시지 배열
  actions: {
    connect: (token: string) => void;
    disconnect: () => void;
    subscribe: (roomId: number) => void;
    publish: (message: ChatMessage) => void;
    addMessage: (roomId: number, message: ChatMessage) => void;
    setMessages: (roomId: number, messages: ChatMessage[]) => void;
  };
}

const useChatStore = create<ChatState>((set, get) => ({
  client: null,
  isConnected: false,
  messages: new Map(),

  actions: {
    // 1. STOMP 클라이언트 생성 및 연결
    connect: (token) => {
      if (get().client || get().isConnected) {
        console.log('이미 연결되어 있습니다.');
        return;
      }
      
      const client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws/chat'),
        connectHeaders: {
          Authorization: `Bearer ${token}`, // JWT 토큰 인증
        },
        debug: (str) => {
          console.log(new Date(), str);
        },
        onConnect: () => {
          set({ isConnected: true });
          console.log('WebSocket 연결 성공!');
        },
        onDisconnect: () => {
          set({ isConnected: false, client: null });
          console.log('WebSocket 연결 끊김!');
        },
        onStompError: (frame) => {
          console.error('STOMP Error:', frame);
        },
      });

      client.activate();
      set({ client });
    },

    // 2. 연결 끊기
    disconnect: () => {
      get().client?.deactivate();
    },

    // 3. 채팅방 구독
    subscribe: (roomId) => {
      const client = get().client;
      if (!client || !get().isConnected) return;

      client.subscribe(`/topic/${roomId}`, (message: IMessage) => {
        const receivedMessage = JSON.parse(message.body) as ChatMessage;
        get().actions.addMessage(roomId, receivedMessage);
      });
    },

    // 4. 메시지 발행 (전송)
    publish: (message) => {
      const client = get().client;
      if (!client || !get().isConnected) return;
      
      client.publish({
        destination: `/send/topic/${message.roomId}`,
        body: JSON.stringify(message),
      });
    },

    // 5. 수신 메시지를 상태에 추가
    addMessage: (roomId, message) => {
      set((state) => {
        const newMessages = new Map(state.messages);
        const currentMessages = newMessages.get(roomId) || [];
        newMessages.set(roomId, [...currentMessages, message]);
        return { messages: newMessages };
      });
    },

    // 6. 이전 메시지를 상태에 설정 (API 호출 후 사용)
    setMessages: (roomId, messages) => {
        set(state => {
            const newMessages = new Map(state.messages);
            newMessages.set(roomId, messages);
            return { messages: newMessages };
        });
    }
  },
}));

// 액션만 쉽게 가져다 쓰기 위한 커스텀 훅
export const useChatActions = () => useChatStore((state) => state.actions);

export default useChatStore;