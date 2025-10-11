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

  //os알림 제목
  const notificationTitle = payload.notification.title; 

  //os알림 바디 
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo/Soongpal.svg',  //아이콘
    badge: '/logo/Soongpal.svg',   //모바일 알림 아이콘

    actions: [
      // { action: 'open_url', title: '자세히 보기' },
      { action: 'close', title: '닫기' }
    ],
    // data: {
    //   click_url: payload.data.click_url 클릭 시 이동할 URL(서버에서 보내줌)
    // }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

//알림창 클릭시 동작 정의
self.addEventListener('notificationclick', (event) => {
  // 닫기 버튼
  if (event.action === 'close') {
    event.notification.close();

  } else {
    // showNotification의 data URL로 새 창 열기
    // const urlToOpen = event.notification.data.click_url;
    // clients.openWindow(urlToOpen);
    // event.notification.close();
  }
});