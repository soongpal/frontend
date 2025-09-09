import {type ChatRoom} from "../../types/chat";
import "../../styles/Chatlist.css";

interface ChatListProps {
  chatRoom: ChatRoom;
}

const ChatList = ({chatRoom}: ChatListProps) =>{

    if(chatRoom.type=="GROUP"){
        return(
            <div className="chatroom-container">
                <div className="first-row">
                    <p className="chatroom-name">{chatRoom.productTitle}</p>
                    <p className="chatroom-update">{chatRoom.updatedAt}</p>
                </div>
                <p className="chatroom-message">{chatRoom.lastMessage}</p>
            </div>
        )
    }

    return(
        <div className="chatroom-container">
            <div>
                <p className="chatroom-name">{chatRoom.name}</p>
                <p className="chatroom-update">{chatRoom.updatedAt}</p>
            </div>
            <p className="chatroom-message">{chatRoom.lastMessage}</p>
        </div>
    )
}

export default ChatList;