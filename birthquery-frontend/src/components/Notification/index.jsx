import { useEffect } from "react";

import {
  useNotificationValue,
  useNotificationDispatchValue,
} from "../../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  const notificationDispatch = useNotificationDispatchValue();

  useEffect(() => {
    if (notification.message && notification.color) {
      const timeout = setTimeout(() => {
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR_NOTIFICATION" });
        }, 5000);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [notification, notificationDispatch]);

  if (notification.message === "") {
    return <div className="notification"></div>;
  } else if (notification.color === "green") {
    return (
      <div className="notification">
        <div className="mt-32 mb-0 mx-12 py-2 px-2 text-green-400 items-center text-2xl text-center border-4 border-green-400 rounded-lg bg-slate-50 bg-opacity-60 whitespace-pre-line break-words">
          {notification.message}
        </div>
      </div>
    );
  } else if (notification.color === "red") {
    return (
      <div className="notification">
        <div className="mt-32 mb-0 mx-12 py-2 px-2 text-red-400 items-center text-2xl text-center border-4 border-red-400 rounded-lg bg-slate-50 bg-opacity-60 whitespace-pre-line break-words">
          {notification.message}
        </div>
      </div>
    );
  }
};

export default Notification;
