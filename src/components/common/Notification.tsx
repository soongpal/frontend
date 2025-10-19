//알림 권한 허용인지
import React, { useEffect, useState } from 'react';
import { requestPermissionAndGetToken } from '../../firebase';
import { sendFcmToken } from '../../api/authAPI';
import "../../styles/Notification.css"


const NotificationButton: React.FC = () => {

  const [permission, setPermission] = useState<NotificationPermission>('default');
  //알림 미지원 기기
  useEffect(() => {
    if (!('Notification' in window)) {
      console.warn('이 브라우저는 알림을 지원하지 않습니다.');
      setPermission('denied'); 
      return;
    }
    setPermission(Notification.permission);
  }, []);

 const handleNotificationChange = async () => {
    if (permission === 'granted') {
      return;
    }

    try {
      if (permission === 'default') {
        const token = await requestPermissionAndGetToken();
        if (token) {
          await sendFcmToken(token);
        }
      }
    } catch (error) {
      console.error('알림 설정 중 오류 발생:', error);
    } finally {
      setPermission(Notification.permission);
    }
  };

  return (
    <div className="notification-toggle-wrapper">
        <label htmlFor="notification-switch" className="toggle-switch">
          <input
            type="checkbox"
            id="notification-switch"
            checked={permission === 'granted'}
            disabled={permission === 'denied'}
            onChange={handleNotificationChange}
          />
          <span className="slider"></span>
        </label>
      </div>
  );
};

export default NotificationButton;