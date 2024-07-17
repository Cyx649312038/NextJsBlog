import MainNavigation from "./main-navigation";
import { useContext } from "react";
import {notificationContext} from "@/store/notificationProvider";
import Notification from "@/components/ui/notification";
export default function Layout(props) {
  const { notificationInfo, showNotificationHandler, hideNotificationHandler } = useContext(notificationContext);
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      {notificationInfo && (
        <Notification
          status={notificationInfo?.status}
          message={notificationInfo?.message}
          title={notificationInfo?.title}
        />
      )}
    </>
  );
}
