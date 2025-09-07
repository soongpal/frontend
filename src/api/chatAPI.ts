//채팅관련 api
import api from './api';
import {type ChatRoom, type ChatMessage} from "../types/chat";
import type { Category } from '../types/product';

//채팅방 목록 조회
export const getChatRoomList = async() =>{
    try {
        const res = await api.get(
            `/api/chat/rooms`,
        );
        return res.data.result as ChatRoom[];
  } catch (error) {
    console.error('채팅목록 불러오기 실패-api:', error);
    throw error;
  }
}

//채팅방 생성
export const createChatRoom = async(params:{ name: string, type: Category}) =>{
    try {
        const res = await api.post(
            `/api/chat/rooms`,
            {params}
        );
        return res.data as ChatRoom;
  } catch (error) {
    console.error('채팅방 생성 실패-api:', error);
    throw error;
  }
}

//채팅방 나가기
export const leaveChatRoom = async(roomId: number) =>{
    try {
        const res = await api.delete(
            `/api/chat/rooms/${roomId}/leave`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 나가기 실패-api:', error);
    throw error;
  }
}

//채팅방 참가
export const joinChatRoom = async(roomId: number) =>{
    try {
        const res = await api.post(
            `/api/chat/rooms/${roomId}/join`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 참가 실패-api:', error);
    throw error;
  }
}

//채팅방 조회
export const getChatRoom = async(roomId: number) =>{
    try {
        const res = await api.get(
            `/api/chat/rooms/${roomId}`,
        );
        return res.data as ChatRoom;
  } catch (error) {
    console.error('채팅방 조회 실패-api:', error);
    throw error;
  }
}

//채팅방 삭제
export const deleteChatRoom = async(roomId: number) =>{
    try {
        const res = await api.delete(
            `/api/chat/rooms/${roomId}`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 삭제 실패-api:', error);
    throw error;
  }
}

//채팅 메세지 조회
export const getChatMessages = async(params:{roomId: number, page: number}) =>{
  try {
    const res = await api.get(
      `/api/chat/messages`,
        {params}
    );

    const { content, currentPage, totalPages, first, last } = res.data.result;

    return {
      messages: content as ChatMessage[],
      currentPage,
      totalPages,
      first,
      last
    }

  } catch (error) {
    console.error('채팅 메세지 조회 실패-api:', error);
    throw error;
  }
}
