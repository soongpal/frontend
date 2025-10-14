//알림
interface NotificationPayload {
  title: string;
  body: string;
}

const EVENT_NAME = 'show-message';

const eventService = {
  dispatch: (detail: NotificationPayload) => {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }));
  },

  listen: (callback: (data: NotificationPayload) => void) => {
    const handler = (event: Event) => {
    
      if (event instanceof CustomEvent) {
        callback(event.detail);
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  },
};

export default eventService;