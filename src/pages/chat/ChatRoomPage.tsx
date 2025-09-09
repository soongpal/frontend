//채팅 방 페이지(개별 채팅방)

//library
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//type
import { type ChatMessage, type ChatRoom } from "../../types/chat";

//api
import { getChatMessages, getChatRoom } from "../../api/chatAPI";

//component
import Loading from "../../components/common/Loading";

//style
import "../../styles/ChatRoom.css";

const ChatRoomPage: React.FC = () =>{

    //chatRoomId받아오기
    const { ChatId } = useParams<{ ChatId: string }>();
    const chatRoomId = Number(ChatId);

    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState< ChatMessage[] | null >(null);

    //채팅방 정보 불러오기(상단 네비바 용도)
    useEffect(() => {
        if (!chatRoomId) return;

        async function fetchRoom() {
            try {
                const data = await getChatRoom(chatRoomId);
                setRoom(data);
            } catch (err) {
                console.error("채팅방 조회 실패", err);
            } finally {
                setLoading(false);
            }
        }

        fetchRoom();
    }, [chatRoomId]);

    //이전 채팅 불러오기
    useEffect(() => {
        async function fetchMessages() {
            const data = await getChatMessages(chatRoomId); // API 호출
            setMessages(data.messages); // useState에 저장
        }
        fetchMessages();
    }, [chatRoomId]);
        
    //로딩중
    if(loading)
    {
        return(
            <Loading/>
        )
    }

    //chatlist클릭 안했을때
    if(chatRoomId==null || room == null)
    {
        return(
            <div></div>
        )
    }

    //chatlist클릭시
    
    return(

        <div className="chatroom-container">
            {/* 채팅 네비바 */}
            <div className="chatroom-nav">
                <p className="chatroom-title">{room.productTitle}</p>
            </div>

            {/* 채팅 메세지 화면 */}
            <div className="message-container">
                {messages.map(msg => (
                    <div key={msg.id} className={msg.senderId === me ? 'message-my' : 'message-other'}>
                    {msg.content}
                    </div>
                ))}
            </div>

            {/* 채팅 입력창 */}
            <div className="chatroom-input">
                <input type="text" placeholder="메시지를 입력하세요" />
                <button>전송</button>
            </div>
        </div>
    )
}

export default ChatRoomPage;