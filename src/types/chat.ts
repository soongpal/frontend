//채팅방
export interface ChatRoom {
  id: number;   //채팅방 아이디
  title?: string;   //채팅방 제목
  productId?: number;   //채팅방 상품
  lastMessage?: string; //마지막 메세지(미리보기용)
  participants: { id: number; name: string }[]; //참가자 id, name(미리보기용)
  updatedAt?: string;   //마지막 채팅 시간(미리보기용)
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

