import { createContext, useEffect, useState, useRef } from "react";

export const notificationContext = createContext({
  notificationInfo: null,
  showNotificationHandler: function () {},
  hideNotificationHandler: function () {},
});

export default function NotificationProvider(props) {
  let timer = useRef();
  const [notificationInfo, setNotificationInfo] = useState();

  useEffect(() => {
    if (
      notificationInfo &&
      (notificationInfo.status == "success" ||
        notificationInfo.status == "error")
    ) {
      timer = setTimeout(() => {
        setNotificationInfo(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [notificationInfo]);

  function showNotificationHandler(status, message, title) {
    setNotificationInfo({
      status,
      message,
      title,
    });
  }

  function hideNotificationHandler() {
    setNotificationInfo(null);
  }

  return (
    <notificationContext.Provider
      value={{
        notificationInfo: notificationInfo,
        showNotificationHandler,
        hideNotificationHandler,
      }}
    >
      {props.children}
    </notificationContext.Provider>
  );
}
