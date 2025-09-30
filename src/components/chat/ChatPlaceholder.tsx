import React from 'react';

//채팅방 선택 안할시 보여지는 채팅방 자리에 넣을거

const ChatPlaceholder: React.FC = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#888'
        }}>
            <p>채팅방을 선택해주세요.</p>
        </div>
    );
};

export default ChatPlaceholder;