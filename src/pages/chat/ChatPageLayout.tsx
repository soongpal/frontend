import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom"; // ✨ NavLink와 Outlet import

// api
import { getChatRoomList } from "../../api/chatAPI";
// type
import type { ChatRoom } from "../../types/chat";
// style
import "../../styles/ChatLayout.css"; // ✨ 레이아웃을 위한 새 CSS 파일

const ChatPageLayout: React.FC = () => {
    // 기존 ChatListPage의 채팅 목록 로직을 가져옴
    const [rooms, setRooms] = useState<ChatRoom[] | null>(null);

    useEffect(() => {
        async function fetchRooms() {
            try {
                const data = await getChatRoomList();
                setRooms(data);
            } catch (err) {
                console.error("채팅방 목록 불러오기 실패", err);
            }
        }
        fetchRooms();
    }, []);

    return (
        <div className="chat-layout-container">
            {/* 왼쪽: 채팅 목록 사이드바 */}
            <div className="chat-sidebar">
                <h3 className="sidebar-title">채팅 목록</h3>
                <div className="chat-room-list">
                    {rooms ? (
                        rooms.map((room) => (
                            // ✨ NavLink를 사용해 클릭 시 해당 채팅방으로 이동
                            // 활성화된 링크는 'active' 클래스가 자동으로 추가되어 스타일링 가능
                            <NavLink 
                                key={room.id} 
                                to={`/chat/${room.id}`} 
                                className="chat-room-item"
                            >
                                <div className="chat-room-info">
                                    <span className="room-name">{room.name}</span>
                                    {/* 마지막 메시지나 다른 정보를 여기에 표시할 수 있습니다. */}
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <p>채팅 목록을 불러오는 중...</p>
                    )}
                     {rooms && rooms.length === 0 && <p>진행중인 채팅이 없습니다.</p>}
                </div>
            </div>

            {/* 오른쪽: 선택된 채팅방이 렌더링될 공간 */}
            <div className="chat-main">
                {/* ✨ Outlet: 중첩된 라우트의 컴포넌트가 여기에 렌더링됩니다. */}
                <Outlet />
            </div>
        </div>
    );
};

export default ChatPageLayout;