import React from 'react';

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