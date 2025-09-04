//채팅관련 api
import api from './api';

//채팅방 목록 조회
//get api/chat/rooms
export const getChatRoomList = async() =>{
    try {
        const res = await api.get(
            `/api/chat/rooms`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅목록 불러오기 실패:', error);
    throw error;
  }
}

//채팅방 생성
// post api/chat/rooms
export const createChatRoom = async() =>{
    try {
        const res = await api.post(
            `/api/chat/rooms`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 생성 실패:', error);
    throw error;
  }
}

//채팅방 나가기
//post api/chat/rooms/{roomId}/leave
export const leaveChatRoom = async(roomId: number) =>{
    try {
        const res = await api.post(
            `/api/chat/rooms/{roomId}/leave`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 나가기 실패:', error);
    throw error;
  }
}

//채팅방 참가
//post /api/chat/rooms/{roomId}/join
export const joinChatRoom = async(roomId: number) =>{
    try {
        const res = await api.post(
            `/api/chat/rooms/{roomId}/join`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 참가 실패:', error);
    throw error;
  }
}

//채팅방 조회
//get /api/chat/rooms/{roomId}
export const getChatList = async(roomId: number) =>{
    try {
        const res = await api.get(
            `/api/chat/rooms/{roomId}`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 조회 실패:', error);
    throw error;
  }
}

//채팅방 삭제
//delete /api/chat/rooms/{roomId}
export const deleteChatRoom = async(roomId: number) =>{
    try {
        const res = await api.delete(
            `/api/chat/rooms/{roomId}`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅방 삭제 실패:', error);
    throw error;
  }
}

//채팅 메세지 조회
//get /api/chat/messages
export const getChatMessages = async() =>{
    try {
        const res = await api.get(
            `/api/chat/messages`,
        );
        return res.data;
  } catch (error) {
    console.error('채팅 메세지 조회:', error);
    throw error;
  }
}
