import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; 

// api
import { getChatRoomList } from "../../api/chatAPI";
// type
import type { ChatRoom } from "../../types/chat";
// style
import "../../styles/ChatLayout.css";
//component
import ChatRoomItem from "../../components/chat/ChatItem";

const ChatPageLayout: React.FC = () => {
    // 채팅 목록 로직은 그대로 유지
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
                            <ChatRoomItem key={room.id} room={room} />
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