// library
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
// type
import { type ChatRoom, type RMessage } from "../../types/chat";

// api
import { getChatMessages, getChatRoom, leaveChatRoom, deleteChatRoom } from "../../api/chatAPI";

// component
import Loading from "../../components/common/Loading";

// style
import "../../styles/ChatRoom.css";

// store
import { useAuthStore } from "../../stores/UserStore";

// STOMP
import SockJS from "sockjs-client";
import { Client, type IMessage  } from "@stomp/stompjs";
//util
import { timeAgo } from "../../utils/time";

const ChatRoomPage: React.FC = () => {
    
    const { ChatId } = useParams<{ ChatId: string }>();

    const roomId = Number(ChatId);  //rommId받아오기

    const navigate = useNavigate();

    const { user, accessToken } = useAuthStore();    //user정보 가져오기

    const stompClient = useRef<Client | null>(null);    //클라이언트 정보 저장

    const [room, setRoom] = useState<ChatRoom | null>(null);    //네비바 채팅방명

    const [isGroup, setIsGroup] = useState<boolean>();

    const [loading, setLoading] = useState(true);   //일단 로딩중으로 시작

    const [messages, setMessages] = useState<RMessage[]>([]);   //페이지에서 보여줄 메세지

    const [page, setPage] = useState(0);    //페이지

    const [ref, inView] = useInView({ //자동 스크롤 구현
        threshold: 0, 
        triggerOnce: false, 
    });  

    const [isFetching, setIsFetching] = useState(false); // 로딩 중복 방지 상태
    
    const [hasMore, setHasMore] = useState(true);   //맨 아래 페이지인지..

    const [input, setInput] = useState(""); //입력창

    //채팅방 초기화 함수
    const resetChatState = () => {
        setMessages([]);
        setPage(0);
        setHasMore(true);
        setRoom(null); 
        setLoading(true);
    };

    // 채팅방 정보 불러오기(상단 네비바 용도)**********************************
    useEffect(() => {
        if (!roomId) return;
        resetChatState();
        async function fetchRoom() {
            try {
                const data = await getChatRoom(roomId);
                setRoom(data);
                if(data && data.type=="GROUP") {
                    setIsGroup(true);
                } else {
                    setIsGroup(false); // 그룹이 아닐 경우
                }
            } catch (err) {
                console.error("채팅방 조회 실패", err);
            } finally {
                setLoading(false);
            }
        }
        fetchRoom();
    }, [roomId]);

    //이전 메세지 불러오기 ****************************************************
    const fetchMessage = async ( pageToFetch: number ) => {

        if(!hasMore||!room||isFetching)
            return;

        setIsFetching(true);

        try {
        const res = await getChatMessages({ roomId: roomId, page: pageToFetch });

        const newMessages = res.content;

        if (newMessages.length > 0) {

            if (pageToFetch === 0) {

                setMessages(newMessages.reverse());
            } else {

                setMessages(prev => [...newMessages.reverse(), ...prev]);
            }
        }
        setPage(pageToFetch);
        
        if (res.last) {
            setHasMore(false);
        }

    } catch (error) {
        console.error(`${pageToFetch}페이지 메시지 로딩 실패:`, error);
    } finally {
        setIsFetching(false);
    }
};


    // STOMP 연결**************************************************************
    useEffect(() => {
        if (!accessToken || !room) return;
  
        const client = new Client({
            // 1. SockJS를 통해 웹소켓 연결
            webSocketFactory: () => {
                return new SockJS(import.meta.env.VITE_WS_URL);
            },
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            onConnect: () => {
                console.log("[STOMP] 서버 연결 성공");//console

                // 4. 채팅방 토픽 구독
                client.subscribe(`/topic/${roomId}`, (message: IMessage) => {   //roomId로 채팅방 구독
                    console.log("[STOMP] 새 메시지 수신:", message.body);//console

                    const receivedMessage: RMessage = JSON.parse(message.body);

                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);  //메세지 오면 맨 뒤에 추가..
                });

            console.log("[API] 초기 메시지 조회를 시작합니다.", room.id);
            fetchMessage(0);

            },
            onStompError: (frame) => {
                console.error("[STOMP] 연결 에러 발생:", frame);//console
            },
            onWebSocketClose: () => {
                console.warn("[STOMP] 웹소켓이 닫혔습니다.");//console
            },
        });

        // 3. Stomp 클라이언트 활성화 (연결 시작)
        stompClient.current = client;
        client.activate();

        // 컴포넌트가 언마운트될 때 연결 해제
        return () => {
            if (stompClient.current?.active) {
            stompClient.current.deactivate();
            }
        };
    }, [room, accessToken]); 


    //채팅방 나가기handleLeaveRoom**********************************************
    const handleLeaveRoom = async()=>{
        if(room){
            try{
                await leaveChatRoom(room.id);
                navigate('/chat');
                window.location.reload(); // 삭제 후 페이지 새로고침
            }
            catch(error:any){
                console.log("채팅방 나가기 오류:", error.message);
            }
        }

    }

    const handleDeleteRoom= async()=>{
        if(room){
            try{
                await deleteChatRoom(room.id);
                navigate('/chat');
            }
            catch(error:any){
                console.log("채팅방 삭제 오류:", error.message);
            }
        }

    }

    //메세지 전송 sendMessage***************************************************
    const sendMessage = () => {
        if (!input.trim()) {
            return;
        }
        if (!stompClient.current?.active || !user || !room) {
            console.error("메시지를 보낼 준비가 되지 않았습니다.");
            return;
        }

        const messagePayload = {
            content: input,
        };


        stompClient.current.publish({
            destination: `/send/${room.id}`, 
            body: JSON.stringify(messagePayload),
            headers: { Authorization: `Bearer ${accessToken}`},
    });

    setInput('');
    };

    //스크롤*****************************************************************
    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            console.log("이전 메세지를 불러옵니다");
            fetchMessage(page + 1); // ✅ 현재 페이지(page)의 다음 페이지를 호출
        }
    }, [inView, hasMore, isFetching, page]);

    
///////////////////////////랜더링///////////////////////////

    if (loading) return <Loading />;    //로딩하면

    if (isNaN(roomId) || !room) return <div></div>; 

    return (
        <div className="chatroom-container">
            <div className="chatroom-nav">
                <p className="chatroom-title">{room.name}</p>
                {isGroup ? 
                    <button onClick={handleLeaveRoom}>나가기</button>:
                    <button onClick={handleDeleteRoom}>삭제하기</button>
                }
            </div>

            <div ref={ref} className="message-container">
                {hasMore && <div>이전 메시지 불러오기...</div>}
                {messages && messages.map((msg, index) => (                    
                    <div
                        key={`${msg.senderId}-${msg.createdAt}-${index}`}
                        className={msg.senderId === user?.userId ? 'message my' : 'message other'}
                    >
                        <span className="message-sender">{msg.senderName}</span>
                        <span className="message-time">{timeAgo(msg.createdAt)}</span>
                        <span className="message-content">{msg.content}</span>
                    </div>
                ))}
                <div />
            </div>

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
    );
};

export default ChatRoomPage;