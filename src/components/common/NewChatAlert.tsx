//앱 접속중일때 알림 오면 띄울창 - 토스트 형식으로

import { useEffect } from 'react';
import './Toast.css';

interface NewChatAlertProps{
    title: string;
    body: string;
    isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChatAlert: React.FC<NewChatAlertProps> = ({ title, body, isVisible, setIsVisible }) => {
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // 3초 후 사라짐

      
      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="toast-container">
      <div className="toast-title">{title}</div>
      <div className="toast-body">{body}</div>
    </div>
  );
};

export default NewChatAlert;