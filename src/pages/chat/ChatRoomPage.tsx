// library
import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
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
import { Client, type IMessage } from "@stomp/stompjs";

// util
import { timeAgo } from "../../utils/time";
import { ChevronLeft, ThreeDots } from "react-bootstrap-icons";

interface ChatContextType {
  // 채팅방 나가기 하면 목록 불러오기용 함수 프롭스 정의
  refreshChatList: () => void;
}

const ChatRoomPage: React.FC = () => {
  const { refreshChatList } = useOutletContext<ChatContextType>();
  const { ChatId } = useParams<{ ChatId: string }>();
  const roomId = Number(ChatId); // roomId 받아오기
  const navigate = useNavigate();
  const { user, accessToken } = useAuthStore(); // user 정보 가져오기
  const stompClient = useRef<Client | null>(null); // 클라이언트 정보 저장

  const [room, setRoom] = useState<ChatRoom | null>(null); // 네비바 채팅방명
  const [isGroup, setIsGroup] = useState<boolean>();
  const [loading, setLoading] = useState(true); // 일단 로딩중으로 시작
  const [messages, setMessages] = useState<RMessage[]>([]); // 페이지에서 보여줄 메시지
  const [page, setPage] = useState(0); // 페이지
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: false }); // 자동 스크롤 구현
  const [isFetching, setIsFetching] = useState(false); // 로딩 중복 방지 상태
  const [hasMore, setHasMore] = useState(true); // 맨 아래 페이지인지
  const [input, setInput] = useState(""); // 입력창
  const [isComposing, setIsComposing] = useState(false);    //드롭다운
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); //컨테이너  Ref
  const shouldScrollToBottom = useRef(true);  //스크롤 이동 여부

  // 채팅방 초기화 함수
  const resetChatState = () => {
    setMessages([]);
    setPage(0);
    setHasMore(true);
    setRoom(null);
    setLoading(true);
  };

  //스크롤 맨 아래 이동 함수
  useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
        if (shouldScrollToBottom.current) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }
  }, [messages]);

  //스크롤 위치 추적
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      if (scrollHeight - scrollTop - clientHeight < 10) {
        shouldScrollToBottom.current = true;
      } else {
        shouldScrollToBottom.current = false;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // 채팅방 정보 불러오기 (상단 네비바 용도)
  useEffect(() => {
    if (!roomId) return;
    resetChatState();

    async function fetchRoom() {
      try {
        const data = await getChatRoom(roomId);
        setRoom(data);
        if (data && data.type === "GROUP") {
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

  // 이전 메시지 불러오기
  const fetchMessage = async (pageToFetch: number) => {
    if (!hasMore || !room || isFetching) return;

    setIsFetching(true);
    try {
      const res = await getChatMessages({ roomId, page: pageToFetch });
      const newMessages = res.content;

      if (newMessages.length > 0) {
        if (pageToFetch === 0) {
          setMessages(newMessages.reverse());
          shouldScrollToBottom.current = true;
        } else {
          setMessages((prev) => [...newMessages.reverse(), ...prev]);
          shouldScrollToBottom.current = false;
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

  // STOMP 연결
  useEffect(() => {
    if (!accessToken || !room) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      onConnect: () => {

        // 채팅방 토픽 구독
        client.subscribe(`/topic/${roomId}`, (message: IMessage) => {
          const receivedMessage: RMessage = JSON.parse(message.body);

          const scrollContainer = scrollContainerRef.current;
          if(scrollContainer) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            if (scrollHeight - scrollTop - clientHeight < 10) {
                shouldScrollToBottom.current = true;
            } else {
                shouldScrollToBottom.current = false;
            }
          }
          
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        fetchMessage(0);
      },
      onStompError: (frame) => {
        console.error("[STOMP] 연결 에러 발생:", frame);
      },
    });

    stompClient.current = client;
    client.activate();

    return () => {
      if (stompClient.current?.active) {
        stompClient.current.deactivate();
      }
    };
  }, [room, accessToken]);

  // 채팅방 나가기
  const handleLeaveRoom = async () => {
    if (room) {
      try {
        await leaveChatRoom(room.id);
        refreshChatList();
        navigate("/chat");
      } catch (error: any) {
        console.log("채팅방 나가기 오류:", error.message);
      }
    }
  };

  // 채팅방 삭제하기
  const handleDeleteRoom = async () => {
    if (room) {
      try {
        await deleteChatRoom(room.id);
        refreshChatList();
        navigate("/chat");
      } catch (error: any) {
        console.log("채팅방 삭제 오류:", error.message);
      }
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (!input.trim()) return;
    if (!stompClient.current?.active || !user || !room) {
      console.error("메시지를 보낼 준비가 되지 않았습니다.");
      return;
    }

    const messagePayload = { content: input };

    stompClient.current.publish({
      destination: `/send/${room.id}`,
      body: JSON.stringify(messagePayload),
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setInput("");
  };

  // 스크롤
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      console.log("이전 메세지를 불러옵니다");
      fetchMessage(page + 1);
    }
  }, [inView, hasMore, isFetching, page]);

  // 드롭다운
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫힘
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  /////////////////////////// 랜더링 ///////////////////////////
  if (loading) return <Loading />;
  if (isNaN(roomId) || !room) return <div></div>;

  return (
    <div className="chatroom-container">
      <div className="chatroom-nav">
        <div className="d-flex justify-content-center align-items-center">
          <button onClick={() => navigate("/chat")} className="back-button">
            <ChevronLeft size={15}/>
          </button>
          <p className="chatroom-title">{room.name}</p>
        </div>

        <div className="dropdown-container" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <ThreeDots />
          </button>

          {isDropdownOpen && (
            <div className="chat-dropdown-menu">
              {/* 채팅 참여자 목록 */}
              {room?.users?.map((user) => (
                <div key={user.userId} className="chat-dropdown-item">
                  {user.userName}
                </div>
              ))}

              {/* 채팅 나가기 / 삭제하기 */}
              {isGroup ? (
                <button className="chat-dropdown-item" onClick={handleLeaveRoom}>
                  나가기
                </button>
              ) : (
                <button className="chat-dropdown-item" onClick={handleDeleteRoom}>
                  삭제하기
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div ref={scrollContainerRef} className="message-container">
        <div ref={ref}>
        {hasMore && <div>이전 메시지 불러오기...</div>}
        </div>
        {messages &&
          messages.map((msg, index) => (
            <div
              key={`${msg.senderId}-${msg.createdAt}-${index}`}
              className={msg.senderId === user?.userId ? "message my" : "message other"}
            >
              <span className="message-sender">{msg.senderName}</span>
              <span className="message-time">{timeAgo(msg.createdAt)}</span>
              <span className="message-content">{msg.content}</span>
            </div>
          ))}
      </div>

      <div className="chatroom-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing) {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
