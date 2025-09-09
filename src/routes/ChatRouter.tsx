//채팅 관련 라우트
import { Route, Routes } from "react-router-dom";
import ChatListPage from "../pages/chat/ChatListPage";
import ChatRoomPage from "../pages/chat/ChatRoomPage";

const ChatRouter : React.FC = () => {
    return(
        <Routes>
            <Route path="chatlist" element={<ChatListPage />}/>
            <Route path="chatroom/:ChatId" element={<ChatRoomPage />}/>
        </Routes>
    )
}

export default ChatRouter;