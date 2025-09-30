import React, { useState, useEffect } from "react";

// api
import { getChatRoomList } from "../../api/chatAPI";
// type
import type { ChatRoom } from "../../types/chat";
//component
import ChatRoomItem from "../../components/chat/ChatItem";
import Loading from "../../components/common/Loading";

const ChatPageLayout: React.FC = () => {
    //채팅 목록 로직
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
        <div className="chat-room-list">
            {rooms ? (
                rooms.map((room) => (
                    <ChatRoomItem key={room.id} room={room} />
                ))
            ) : (
                <Loading/>
            )}
            {rooms && rooms.length === 0 && <p>진행중인 채팅이 없습니다.</p>}
        </div>
    );
};

export default ChatPageLayout;