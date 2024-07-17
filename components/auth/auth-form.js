import { useState, useRef, useContext } from "react";
import {notificationContext} from "@/store/notificationProvider";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

import classes from "./auth-form.module.css";

function AuthForm() {
  const { notificationInfo, showNotificationHandler, hideNotificationHandler } = useContext(notificationContext);
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function signUpUser(email, password) {
    showNotificationHandler(
      "pending",
      "Your message is on its way!",
      "Sending message..."
    );
    const res = await fetch("/api/signUp", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res",res);
    const data = await res.json();
    return data;
  }
  

  async function onSubmitHandel(event) {
    event.preventDefault();
    if (!isLogin) {
      const res = await signUpUser(email, password);
      if (res.code == 200) {
        //    全局context提示成功
        showNotificationHandler("success", "signUp successfully!", "Success");
      } else {
        showNotificationHandler("error", res.message || "Error", "Error");
      }
    } else {
      showNotificationHandler(
        "pending",
        "LoginIn...",
        "Wraiting......"
      );
      //  发起登录请求
      const res = await signIn("credentials",{
        // 不设置成false当服务端抛错时会默认跳转到error页面
        redirect: false,
        email: email,
        password: password,
      })
      console.log("clientRes", res);
      if (!res.error) {
        showNotificationHandler(
          "success",
          "signIn successfully!",
          "Success"
        );
        // set some auth state
        router.replace('/');
      } else {
        showNotificationHandler("error", res.error || "Error", "Error");
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandel}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            type="button"
            className={classes.toggle}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
