import {type ChatRoom} from "../../types/chat";
import "../../styles/Chatlist.css";
import { useNavigate } from "react-router-dom";

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
            <div>
                <p className="chatroom-name">{chatRoom.productTitle}</p>
                <p className="chatroom-update">{chatRoom.updatedAt}</p>
            </div>
            <p className="chatroom-message">{chatRoom.lastMessage}</p>
        </div>
    )
}

export default ChatList;