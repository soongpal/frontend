//채팅 방 페이지(개별 채팅방)

//library
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//type
import { type ChatMessage, type ChatRoom, type SendChat } from "../../types/chat";

//api
import { getChatMessages, getChatRoom, leaveChatRoom } from "../../api/chatAPI";

//component
import Loading from "../../components/common/Loading";

//style
import "../../styles/ChatRoom.css";

//store
import { useAuthStore } from "../../stores/UserStore";

// STOMP
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatRoomPage: React.FC = () =>{

    //chatRoomId받아오기
    const { ChatId } = useParams<{ ChatId: string }>(); //chatid받아오기
    const roomId = Number(ChatId);  //number로 변경
    const navigate = useNavigate();
    const { user } = useAuthStore();        //유저 정보 불러오기

    //c애팅방 필드
    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [loading, setLoading] = useState(true);
    //메세지 필드
    const [messages, setMessages] = useState< ChatMessage[] | null >(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true); // 위로 스크롤시 더 불러올지
    //무한 스크롤 용도
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    //stomp 필드
    const stompRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<any>(null);

    //채팅방 정보 불러오기(상단 네비바 용도)
    useEffect(() => {
        if (!roomId) return;

        async function fetchRoom() {
            try {
                const data = await getChatRoom(roomId);
                setRoom(data);
            } catch (err) {
                console.error("채팅방 조회 실패", err);
            } finally {
                setLoading(false);
            }
        }

        fetchRoom();
    }, [roomId]);

     // --- 메시지 불러오기 함수 ---
    const fetchMessages = async (pageToFetch: number) => {
        try {
        const res = await getChatMessages({ id: roomId, page: pageToFetch });
        const newMessages = res.messages;

        if (pageToFetch === 0) {
            // 최신 메시지 기준 → 화면 맨 아래
            setMessages([...newMessages].reverse());
        } else {
            // 과거 메시지 위에 붙이기
            setMessages(prev => [...newMessages.reverse(), ...(prev ?? [])]);
        }

        setHasMore(!res.first); // 첫 페이지면 더 이상 없음
        setPage(pageToFetch);
        } catch (err) {
        console.error("메시지 불러오기 실패:", err);
        }
    };


    //초기 채팅 불러오기
    useEffect(() => {
        fetchMessages(0);
    }, [roomId]);


     // STOMP 연결
    useEffect(() => {
        if (!roomId || !user) return;

        const socket = new SockJS("ws://localhost:비밀/ws/chat");
        const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
    });

    //구독
    stompClient.onConnect = () => {
    subscriptionRef.current = stompClient.subscribe(
        `/topic/${roomId}`,
        msg => {
        const message = JSON.parse(msg.body) as ChatMessage;
        setMessages(prev => [...(prev ?? []), message]);
        scrollToBottom();
        }
    );
    };

    stompClient.activate();



    // 채팅방 나가면 언마운트
    return () => {
      subscriptionRef.current?.unsubscribe();
      stompClient.deactivate();
        };
    }, [roomId, user]);

    //위로 스크롤시
    const handleScroll = () => {
        if (!containerRef.current || !hasMore) return;

        if (containerRef.current.scrollTop === 0) {
        fetchMessages(page + 1); // 과거 메시지 로드
        }
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [hasMore, page]);

    // --- 자동 스크롤 (최신 메시지 맨 아래) ---
    useEffect(() => {
        if (page === 0) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    //맨 아래로 스크롤
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

    // 메시지 전송 
    const [input, setInput] = useState("");
    const sendMessage = () => {
        if (!input.trim() || !stompRef.current || !user) return;

        //메세지 형식
        const message: SendChat = {
            roomId,
            senderId: user.userId,
            content: input,
        };

        // STOMP 전송
        stompRef.current.publish({
            destination: `/send/${roomId}`,
            body: JSON.stringify(message),
        });

        setInput(""); // 입력창 초기화
    };


      //방 나가기
    const handleLeaveRoom = async () => {
        try {
        await leaveChatRoom(roomId);
        stompRef.current?.deactivate(); // 구독 해제
        navigate("/chat-list");
        } catch (err) {
        console.error(err);
        }
    };


                
    //로딩중
    if(loading)
    {
        return(
            <Loading/>
        )
    }

    //chatlist클릭 안했을때
    if(isNaN(roomId) || !room)
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
            <div>
                <div  ref={containerRef} className="message-container">
                    {messages == null ? (
                        <p>대화를 시작해보세요!.</p>
                    ) : (
                        messages.map(msg => (
                        <div
                            key={msg.senderId + msg.createdAt}
                            className={msg.senderId === user?.userId ? 'message my' : 'message other'}
                        >
                            {msg.content}
                        </div>
                        ))
                    )}
                    </div >
                    <div ref={messagesEndRef}/>
            </div>

            {/* 채팅 입력창 */}
            <div className="chatroom-input">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                 />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    )
}

export default ChatRoomPage;