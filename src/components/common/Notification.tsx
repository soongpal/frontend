//알림 권한 허용인지
import React from 'react';
import { requestPermissionAndGetToken } from '../../firebase';
import { sendFcmToken } from '../../api/authAPI';
import { BellFill } from 'react-bootstrap-icons';

const NotificationButton: React.FC = () => {

  const handleNotificationClick = async () => {
    const token = await requestPermissionAndGetToken();
    if (token) {
      console.log("발급 토큰:", token);
      try {
        await sendFcmToken(token);
        alert('알림을 허용하였습니다');
      } catch (error) {
        alert('알림 설정 중 오류 발생');
      }
    }
  };

  return (
    <button onClick={handleNotificationClick}>
      <BellFill/>
    </button>
  );
};

export default NotificationButton;