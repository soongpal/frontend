import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage  } from "firebase/messaging";
import eventService from "./eventService";

const firebaseConfig = {
  apiKey: "AIzaSyCD4YmWFIr9IhqALrd5WFRGKULqeWnXh5s",
  authDomain: "soongpal.firebaseapp.com",
  projectId: "soongpal",
  storageBucket: "soongpal.firebasestorage.app",
  messagingSenderId: "533545582287",
  appId: "1:533545582287:web:041a42ca26c4a488b6c1ba",
  measurementId: "G-DZQ5H802NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//구글 애널리틱스
export const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const requestNotificationPermission = async (): Promise<boolean> => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("알림 권한이 허용되었습니다.");
    return true;
  } else if (permission === "denied") {
    console.log("알림 권한이 거부되었습니다.");
    return false;
  } else {
    console.log("알림 권한이 기본 상태입니다(허용도 거부도 아님).");
    return false;
  }
};

export const getFcmToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BDKsidTxH5caa9GNuyTVMz-XXQdBwVUiZLRlr3lMFbL0dc0Zg-QQPWT6alMirF-UdVA15Tg6jK3DnZtZXr8CMzE",
    });

    if (token) {
      console.log("FCM 토큰:", token);
      return token;
    } else {
      console.warn("FCM 토큰을 가져오지 못했습니다.");
      return null;
    }
  } catch (error) {
    console.error("FCM 토큰 요청 중 오류 발생:", error);
    return null;
  }
};
//웹사이트 사용중일때 알림
onMessage(messaging, (payload) => {
  
  const notificationTitle = payload.notification?.title;
  const notificationBody = payload.notification?.body;
  
  if (notificationTitle && notificationBody) {
    eventService.dispatch({ title: notificationTitle, body: notificationBody });
  }
});

