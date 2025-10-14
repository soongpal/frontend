import React, { useState, useEffect } from 'react'; // useState, useEffect 추가
import '../styles/App.css';
import AppRouter from '../routes/AppRouter';
import eventService from '../eventService';
import NewChatAlert from '../components/common/NewChatAlert'; // Toast 컴포넌트 추가

interface NotificationState {
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationState>({ title: '', body: '' });

  useEffect(() => {
    const cleanup = eventService.listen((data) => {
      setNotification({ title: data.title, body: data.body });
      setToastVisible(true);
    });
    return cleanup;
  }, []);

  return (
    <>
      <AppRouter />
      <NewChatAlert
        title={notification.title}
        body={notification.body}
        isVisible={toastVisible}
        setIsVisible={setToastVisible}
      />
    </>
  );
};

export default App;