// 알림 권한 허용인지
import React, { useEffect, useState } from "react";
import { requestNotificationPermission, getFcmToken } from "../../firebase";
import { sendFcmToken, diableFcmToken } from "../../api/authAPI";
import "../../styles/Notification.css";

const NotificationButton: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

//알림지원확인
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("이 브라우저는 알림을 지원하지 않습니다.");
      setIsSupported(false);
      setPermission("denied");
      return;
    }

    setPermission(Notification.permission);
  }, []);

  // 알림 설정 토글 함수
  const handleNotificationChange = async () => {
    if (!isSupported || isProcessing) return;
    setIsProcessing(true);

    try {
      // 1브라우저 알림이 차단
      if (permission === "denied") {
        alert("브라우저에서 알림이 차단되어 있습니다. 설정에서 허용해주세요.");
        return;
      }

      // 알림 설정을 안 한 경우
      if (permission === "default") {
        const granted = await requestNotificationPermission();
        setPermission(granted ? "granted" : "denied");
        if (!granted) return;
      }

      // 권한이 허용된 경우
      if (Notification.permission === "granted") {
        const token = await getFcmToken();
        if (!token) {
          console.log("FCM 토큰 가져오기 실패");
          return;
        }

        if (permission === "granted") {
          await diableFcmToken(token);
          setPermission("default");
        } else {
          await sendFcmToken(token);
          setPermission("granted");
        }
      } else {
        setPermission(Notification.permission);
      }
    } catch (error) {
      console.error("알림 처리 중 오류:", error);
      setPermission(Notification.permission);
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
          checked={permission === "granted"}
          disabled={!isSupported || permission === "denied" || isProcessing}
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
