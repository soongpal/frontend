import { type Category } from "./product";
//채팅방
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

//메세지
export interface ChatMessage {
  id?: number;  //메세지 id(서버생성)             
  roomId: number;   //채팅방 아디
  senderId: number; //전송자 id
  senderName: string;   //전송자 닉네임
  content: string;  //전송 내용
  sendTime?: string;   //전송 시각(서버생성)
}

