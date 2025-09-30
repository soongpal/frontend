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
            <div className="chat-sidebar">
                <h3 className="sidebar-title">채팅 목록</h3>
                <div className="chat-room-list">
                    {rooms ? (
                        rooms.map((room) => (
                            <NavLink 
                                key={room.id} 
                                to={`/chat/${room.id}`} 
                                className="chat-room-item"
                            >
                                <div className="chat-room-info">
                                    <span className="room-name">{room.name}</span>
                                 
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <p>채팅 목록을 불러오는 중...</p>
                    )}
                     {rooms && rooms.length === 0 && <p>진행중인 채팅이 없습니다.</p>}
                </div>
            </div>


            <div className="chat-main">
              
                <Outlet />
            </div>
        </div>
    );
};

export default ChatPageLayout;