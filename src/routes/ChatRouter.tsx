//채팅 관련 라우트
import { Route, Routes } from "react-router-dom";
import ChatPgae from "../pages/chat/ChatRoomPage";

const ChatRouter : React.FC = () => {
    return(
        <Routes>
            <Route path="chatroom/" element={<ChatPgae />}/>
            <Route path="chatroom/:ChatId" element={<ChatPgae />}/>
        </Routes>
    )
}

export default ChatRouter;