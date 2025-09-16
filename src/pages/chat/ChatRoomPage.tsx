// library
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// type
import { type ChatMessage, type ChatRoom, type SendChat } from "../../types/chat";

// api
import { getChatMessages, getChatRoom, leaveChatRoom } from "../../api/chatAPI";

// component
import Loading from "../../components/common/Loading";

// style
import "../../styles/ChatRoom.css";

// store
import { useAuthStore } from "../../stores/UserStore";

// STOMP
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatRoomPage: React.FC = () => {
    
    // chatRoomId 받아오기
    const { ChatId } = useParams<{ ChatId: string }>();
    const roomId = Number(ChatId);
    const navigate = useNavigate();
    const { user } = useAuthStore();

    // 채팅방 필드
    const [room, setRoom] = useState<ChatRoom | null>(null);
    const [loading, setLoading] = useState(true);
    // 메시지 필드
    const [messages, setMessages] = useState<ChatMessage[] | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    // 무한 스크롤 및 STOMP 참조
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const stompRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<any>(null);
    const [input, setInput] = useState("");

    // 채팅방 정보 불러오기(상단 네비바 용도)
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

    //메시지 불러오기
    const fetchMessages = async (pageToFetch: number) => {
        if (!hasMore && pageToFetch > 0) return; // 더 이상 메시지가 없으면 로드 중지

        try {
            const res = await getChatMessages({ roomId: roomId, page: pageToFetch });
            const newMessages = res.messages.reverse(); // 시간 순서대로 정렬 (과거 -> 현재)

            if (pageToFetch === 0) {
                setMessages(newMessages);
            } else {
                // 이전 스크롤 위치 유지를 위해 추가
                const scrollContainer = containerRef.current;
                const oldScrollHeight = scrollContainer?.scrollHeight || 0;

                setMessages(prev => [...newMessages, ...(prev ?? [])]);
                
                // 데이터 로드 후 스크롤 위치 조정
                if(scrollContainer) {
                    requestAnimationFrame(() => {
                        scrollContainer.scrollTop = scrollContainer.scrollHeight - oldScrollHeight;
                    })
                }
            }
            setHasMore(!res.first);
            setPage(pageToFetch);
        } catch (err) {
            console.error("메시지 불러오기 실패:", err);
        }
    };

    // 초기 채팅 불러오기
    useEffect(() => {
        if(roomId) fetchMessages(0);
    }, [roomId]);

    // STOMP 연결 + 구독 한곳에서 처리
useEffect(() => {
    if (!roomId || !user) {
        console.warn("[STOMP] roomId 또는 user 없음 → 연결 안 함");
        return;
    }

    console.log("[STOMP] Client 생성 시작");

    const stompClient = new Client({
        webSocketFactory: () => {
            console.log("[STOMP] SockJS 생성:", import.meta.env.VITE_WS_URL);
            return new SockJS(import.meta.env.VITE_WS_URL);
        },
        debug: (str) => console.log("[STOMP debug]", new Date().toISOString(), str),
    });
    stompRef.current = stompClient;

    // 1) 연결 완료 후 구독까지 처리
    stompClient.onConnect = () => {
        console.log("[STOMP] ✅ 연결 성공 → room:", roomId);

        try {
            subscriptionRef.current = stompClient.subscribe(
                `/topic/${roomId}`,
                (msg) => {
                    console.log("[STOMP] 📩 메시지 수신:", msg.body);
                    try {
                        const message = JSON.parse(msg.body) as ChatMessage;
                        setMessages((prev) => [...(prev ?? []), message]);
                    } catch (parseErr) {
                        console.error("[STOMP] ❌ 메시지 파싱 실패:", parseErr, msg.body);
                    }
                }
            );
            console.log("[STOMP] ✅ 구독 성공 → /topic/" + roomId);
        } catch (subErr) {
            console.error("[STOMP] ❌ 구독 실패:", subErr);
        }
    };

    // 2) 에러 핸들러 추가
    stompClient.onStompError = (frame) => {
        console.error("[STOMP] ❌ 브로커 에러:", frame.headers["message"], frame.body);
    };

    stompClient.onWebSocketError = (event) => {
        console.error("[STOMP] ❌ WebSocket 에러:", event);
    };

    stompClient.onDisconnect = (frame) => {
        console.warn("[STOMP] ⚠️ 연결 끊김:", frame);
    };

    // 3) 연결 시도
    console.log("[STOMP] activate() 호출 → 연결 시작");
    stompClient.activate();

    // cleanup
    return () => {
        console.log("[STOMP] cleanup → 구독 해제 및 연결 종료");
        try {
            subscriptionRef.current?.unsubscribe();
            stompClient.deactivate();
        } catch (cleanupErr) {
            console.error("[STOMP] ❌ cleanup 중 에러:", cleanupErr);
        }
    };
}, [roomId, user]);



    // 위로 스크롤 시 과거 메시지 로드
    const handleScroll = () => {
        if (containerRef.current?.scrollTop === 0 && hasMore) {
            fetchMessages(page + 1);
        }
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [hasMore, page]);

    //  messages 배열이 변경될 때마다 맨 아래로 스크롤
    useEffect(() => {
        // 첫 페이지 로드 시 또는 새 메시지 수신 시에만 맨 아래로 스크롤
        // 과거 메시지 로드 시(page > 0)에는 스크롤 유지
        if (page === 0) {
            messagesEndRef.current?.scrollIntoView();
        }
    }, [messages]);


    // 메시지 전송
    const sendMessage = () => {
        if (!input.trim() || !stompRef.current?.active || !user) return;

        const message: SendChat = {
            roomId,
            senderId: user.userId,
            content: input,
        };

        stompRef.current.publish({
            destination: `/send/${roomId}`,
            body: JSON.stringify(message),
        });

        setInput("");
    };

    // 방 나가기
    const handleLeaveRoom = async () => {
        if (!stompRef.current) return;
        try {
            await leaveChatRoom(roomId);
            stompRef.current.deactivate();
            navigate("/chatlist");
        } catch (err) {
            console.error("방 나가기 실패:", err);
            navigate("/chatlist");
        }
    };

    if (loading) return <Loading />;
    if (isNaN(roomId) || !room) return <div></div>;

    return (
        <div className="chatroom-container">
            <div className="chatroom-nav">
                <p className="chatroom-title">{room.name}</p>
                <button onClick={handleLeaveRoom}>나가기</button>
            </div>

            <div ref={containerRef} className="message-container">
                {hasMore && <div className="load-more">이전 메시지 불러오기...</div>}
                {messages && messages.map((msg, index) => (                    <div
                        key={`${msg.senderId}-${msg.createdAt}-${index}`}
                        className={msg.senderId === user?.userId ? 'message my' : 'message other'}
                    >
                        <span className="message-content">{msg.content}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
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