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

export const requestPermissionAndGetToken = async () => {
  // 알림 권한 요청
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('알림 권한이 허용되었습니다.');
  } else if (permission === "denied") {
    console.log("알림 권한이 거부되었습니다. ");
    return null;
  }

  //VAPID 키로 FCM 등록 토큰을 가져오기
  const token = await getToken(messaging, {
    vapidKey: "BDKsidTxH5caa9GNuyTVMz-XXQdBwVUiZLRlr3lMFbL0dc0Zg-QQPWT6alMirF-UdVA15Tg6jK3DnZtZXr8CMzE",
  });

  return token;
};

//웹사이트 사용중일때 알림
onMessage(messaging, (payload) => {
  console.log("메시지 수신: ", payload); 

  const notificationTitle = payload.notification?.title;
  const notificationBody = payload.notification?.body;
  
  if (notificationTitle && notificationBody) {
    eventService.dispatch({ title: notificationTitle, body: notificationBody });
  }
});

