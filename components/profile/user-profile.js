import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useEffect, useContext } from "react";
import {notificationContext} from "@/store/notificationProvider";

function UserProfile(props) {
  const { notificationInfo, showNotificationHandler, hideNotificationHandler } = useContext(notificationContext);
  async function changePasswordHandler(passwordData) {
    showNotificationHandler(
      "pending",
      "Your message is on its way!",
      "Sending message..."
    );
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if(data.code == 200) {
      showNotificationHandler(
        "success",
        "Your password reset success!",
        "Success"
      );
    } else {
      showNotificationHandler(
        "error",
        data.message || "Password reset failed!",
        "Error"
      );
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
