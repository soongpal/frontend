import { type Category } from "./product";

//채팅방(name과 type전송)
export interface ChatRoom {

  id?: number;   //채팅방 아이디

  name: string;   //채팅방 제목

  type: Category; //채팅방 유형

  userCount?: number; //참여자 수

  users?:{
    userID: number;
    userName: string;
    profileImage: null;
  }[];  //참여자 정보 배열

  lastMessage?: string | null;  //마지막 메세지

  createdAt?: string;  //생성 시각

  updatedAt?: string;  //수정 시각
  
}

//메세지(roomId와 senderId, content전송)
export interface ChatMessage {

  roomId: number; //채팅방 Id

  senderId: number; //보낸사람 Id

  senderName?: string; //보낸사람 이름

  content: string;  //메세지 내용

  createdAt?: string;  //전송시각

}

