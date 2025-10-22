// 알림 권한 허용인지
import React, { useEffect, useState } from "react";
import { requestNotificationPermission, getFcmToken } from "../../firebase";
import { sendFcmToken, diableFcmToken, isAlarmOn } from "../../api/authAPI";
import "../../styles/Notification.css";

const NotificationButton: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [toggle, setToggle] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

//알림지원확인
  useEffect( () => {

    const initNotification = async () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // 브라우저 지원 여부
    if (!("Notification" in window) && !isSafari) {
      console.log("이 브라우저는 알림을 지원하지 않습니다.");
      setIsSupported(false);
      setPermission("denied");
      return;
    }

    //알림 권한
    const currentPermission = Notification.permission;
    setPermission(currentPermission);

    if (currentPermission !== "granted") return; // 권한이 없으면 종료

    // FCM 토큰 발급
    try {
      const token = await getFcmToken();
      if (!token) return;

      // 알람 상태 확인
      const alarm = await isAlarmOn(token);
      setToggle(alarm);
    } catch (err) {
      console.error("알림 초기화 실패:", err);
    }
  };

  initNotification();
  }, []);

const handleNotificationChange = async () => {
  if (!isSupported || isProcessing) return;
  setIsProcessing(true);

  try {
    const currentPermission = Notification.permission;
    setPermission(currentPermission);

    // 1. 토글이 꺼져있는 경우 (알림을 켜는 경우)
    if (!toggle) {
      //1)브라우저 알림이 꺼져 있는 경우
      if (currentPermission === "denied") {
        alert("브라우저에서 알림이 차단되어 있습니다. 설정에서 허용해주세요.");
        return;
      }

      // 2) 브라우저 알림 설정이 안 된 경우 -> 요청
      if (currentPermission === "default") {
        const granted = await requestNotificationPermission();
        setPermission(granted ? "granted" : "denied");
        if (!granted) return; // 허용 안 하면 종료
      }

      // 3) 토큰 발급
      const token = await getFcmToken();
      if (!token) {
        console.error("FCM 토큰 발급 실패");
        return;
      }

      //서버에 토큰 전송
      await sendFcmToken(token);

      // 서버 토큰 상태 확인
      const alarm = await isAlarmOn(token);
      setToggle(alarm);
      return;
    }

    // 2. 토글이 켜진 경우 (알림 끄는 경우)
    if (toggle) {
      const token = await getFcmToken();
      if (!token) {
        console.error("FCM 토큰 발급 실패");
        return;
      }

      // 서버에서 FCM 등록 해제
      await diableFcmToken(token);
      setToggle(false);
    }

  } catch (error) {
    console.error("알림 설정 중 오류 발생:", error);
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="notification-toggle-wrapper">
      <label htmlFor="notification-switch" className="toggle-switch">
        <input
          type="checkbox"
          id="notification-switch"
          checked={toggle === true}
          disabled={!isSupported || permission === "denied" || isProcessing }
          onChange={handleNotificationChange}
        />
        <span className="slider"></span>
      </label>

      {!isSupported && (
        <p className="notification-warning">이 브라우저는 알림을 지원하지 않습니다.</p>
      )}
    </div>
  );
};

export default NotificationButton;
