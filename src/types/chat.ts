export type ChatType = "PRIVATE" | "GROUP";

//채팅방(name과 type전송)
export interface ChatRoom {

  id: number;   //채팅방 아이디

  name: string;   //채팅방 제목

  productTitle: string; //상품 제목

  type: ChatType; //채팅방 유형

  userCount: number; //참여자 수

  users:{
    userId: number;
    userName: string;
    profileImage: null;
  }[];  //참여자 정보 배열

  lastMessage: string | null;  //마지막 메세지

  createdAt: string;  //생성 시각

  updatedAt: string;  //수정 시각
  
}

export interface RMessage {  //stomp받은 메세지 형식
  
  roomId: number; //채팅방 Id

  senderId: number; //보낸사람 Id

  senderName: string; //보낸사람 이름

  content: string;  //메세지 내용

  createdAt: string;  //전송시각
}


export interface ChatMessage {
  content: RMessage[];  // 메시지 리스트
  currentPage: number;     // 현재 페이지
  totalPages: number;      // 전체 페이지 수
  first: boolean;          // 첫 페이지 여부
  last: boolean;          
}
