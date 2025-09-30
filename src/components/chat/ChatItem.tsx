//채팅방 목록 개별 컴포넌트
import type React from "react";
import { NavLink } from "react-router-dom";
import { type ChatRoom } from "../../types/chat";
import { timeAgo } from "../../utils/time";
// style
import "../../styles/ChatItem.css";

interface ChatRoomItemProps {
    room: ChatRoom;
}

const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ room }) => {
    const isGroupChat = room.type === 'GROUP';
    return (
        <NavLink to={`/chat/${room.id}`} className="chat-room-item">
            <div className="chat-item-row">
                {/* 상품 이름 */}
                <span className="product-title">{room.productTitle}</span>
                
                {isGroupChat ? (
                    // 공구 채팅방: 사용자 명수 표시
                    <span className="participant-info">{room.userCount}명</span>
                ) : (
                    // 중고거래 채팅방: 상대방 이름 표시
                    <span className="participant-info">{room.name}</span>
                )}
            </div>

            <div className="chat-item-row">
                {/* 마지막 메시지*/}
                <span className="last-message">{room.lastMessage || "메시지가 없습니다."}</span>
                {/* 마지막 메시지 시간*/}
                <span className="last-time">{timeAgo(room.updatedAt)}</span>
            </div>
        </NavLink>
    );
};

export default ChatRoomItem;