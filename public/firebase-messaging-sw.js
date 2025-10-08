//알림서비스
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCD4YmWFIr9IhqALrd5WFRGKULqeWnXh5s",
  authDomain: "soongpal.firebaseapp.com",
  projectId: "soongpal",
  storageBucket: "soongpal.firebasestorage.app",
  messagingSenderId: "533545582287",
  appId: "1:533545582287:web:041a42ca26c4a488b6c1ba",
  measurementId: "G-DZQ5H802NN"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("메시지가 왔습니다: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});