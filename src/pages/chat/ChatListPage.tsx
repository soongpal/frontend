//채팅 목록 페이지
import type React from "react";
import { useState, useEffect } from "react";

//api
import { getChatRoomList } from "../../api/chatAPI";

//type
import type { ChatRoom } from "../../types/chat";

//component
import ChatList from "../../components/chat/ChatList";

const ChatListPage: React.FC = () =>{

    //내 채팅 목록 불러오기
    const [rooms, setRooms] = useState< ChatRoom[] | null >(null);

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

    if(rooms == null){
        return(
            <div>
                <p>진행중인 채팅이 없습니다. </p>
            </div>
        )
    }

    return(
        <div>
           <h3 className="text-start mt-3 mb-3 align-items-center d-flex">
                <b>채팅 목록</b>
            </h3>
            {rooms.map((room) => (
                <ChatList key={room.id} chatRoom={room} />
            ))}
        </div>
    )
}

export default ChatListPage;