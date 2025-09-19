import {type ChatRoom} from "../../types/chat";
import "../../styles/Chatlist.css";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/time";

interface ChatListProps {
  chatRoom: ChatRoom;
}

const ChatList = ({chatRoom}: ChatListProps) =>{

    const navigate = useNavigate();

    //채팅방 목록에서 클릭시 채팅방 띄우기 
    const handleChatRoomClick = (chatId: number)=>{
        navigate(`chatroom/:${chatId}`);
    }

    return(
        <div className="chatroom-container" onClick={()=>{handleChatRoomClick(chatRoom.id)}}>
            <div className="d-flex justify-content-between align-items-center">
                <p className="chatroom-name">{chatRoom.productTitle}</p>
                <p className="chatroom-update">{timeAgo(chatRoom.updatedAt)}</p>
            </div>
             {chatRoom.lastMessage && (
                <p className="chatroom-message">{chatRoom.lastMessage}</p>
                )}
        </div>
    )
}

export default ChatList;