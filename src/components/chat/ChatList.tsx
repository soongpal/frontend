import {type ChatRoom} from "../../types/chat"

interface ChatListProps {
  chatRoom: ChatRoom;
}

const ChatList = ({chatRoom}: ChatListProps) =>{

    return(
        <div>

            <p>{chatRoom.name}</p>
            <p>{chatRoom.productTitle}</p>
            <p>{chatRoom.lastMessage}</p>
            <p>{chatRoom.updatedAt}</p>

        </div>
    )
}

export default ChatList;