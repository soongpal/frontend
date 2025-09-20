//채팅 관련 라우트
import { Route, Routes } from "react-router-dom";
import ChatRoomPage from "../pages/chat/ChatRoomPage";
// ✨ 1. 새로 만든 레이아웃과 플레이스홀더 컴포넌트를 import 합니다.
import ChatPageLayout from "../pages/chat/ChatPageLayout";
import ChatPlaceholder from "../components/chat/ChatPlaceholder";

const ChatRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ChatPageLayout />}>
                <Route index element={<ChatPlaceholder />} />
                <Route path=":ChatId" element={<ChatRoomPage />} />

            </Route>
        </Routes>
    )
}

export default ChatRouter;