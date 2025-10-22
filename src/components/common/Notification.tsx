//알림 권한 허용인지
import React, { useEffect, useState } from 'react';
import { requestPermissionAndGetToken } from '../../firebase';
import { sendFcmToken, diableFcmToken } from '../../api/authAPI';
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

    if (permission === 'denied') return;//브라우저 알림 차단된 경우

    try {
      const token = await requestPermissionAndGetToken(); //알림 요청&토큰 받기

      if (token) {
        if (permission === 'granted') { //이미 알림 허용인 경우-알림 끄기
          await diableFcmToken(token);
          setPermission('default');

        } else if (permission === 'default') {  //알림 설정 처음 - 알림 켜기
          await sendFcmToken(token);
          setPermission(Notification.permission);
        }

      } else {  //알림 차단인경우
        setPermission(Notification.permission);
      }

    } catch (error) {
      console.error('알림 처리 중 오류:', error);
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