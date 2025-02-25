import React, { useState } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helper";
import { validateEmail, validatePassword } from "@/validators/auth";
import { useRouter } from "next/navigation";
function Login({ showRegisterForm }) {
  const [showOTP, setShowOTP] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()

  const showOtpHandler = () => setShowOTP(true);

  const signIn = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) {
      return showSwal("Enter Password and Email", "error", "ok");
    }
    const isValidPassword = validatePassword(password);
    const isValidEmail = validateEmail(emailOrPhone);
    if (!isValidEmail || !isValidPassword) {
      return showSwal("Enter valid Password or Email", "error", "ok");
    }
    const userDate = { email: emailOrPhone, password };
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDate),
    });
    const result = await res.json();
    if (res.status === 200) {
      return showSwal("you logged in successfully", "success", "ok").then(()=>router.push("/"));
    }
    if (res.status === 419 || res.status === 422 || res.status === 401)
      return showSwal(result.message, "error", "ok");
  };
  return (
    <>
      {showOTP ? (
        <Sms hideOtpForm={() => setShowOTP(false)} />
      ) : (
        <section className={styles.login_container}>
          <form>
            <input
              type="text"
              placeholder="Email/Phone Number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.password}
            />
            <span className={styles.remember}>
              <input type="checkbox" name="" id="" /> Remember me
            </span>
            <button type="submit" className={styles.btn} onClick={signIn}>
              Sign in
            </button>
          </form>
          <Link href={"/forget-password"} className={styles.forgot}>
            Do you forget your password?
          </Link>
          <button className={styles.btn} onClick={showOtpHandler}>
            Sign in with One-Time Password
          </button>
          <span className={styles.register}>Don't have an account?</span>
          <button
            className={`${styles.register_btn} ${styles.btn}`}
            onClick={showRegisterForm}
          >
            Sign up
          </button>
          <Link href={"/"} className={styles.redirect_to_home}>
            Back
          </Link>
        </section>
      )}
    </>
  );
}

export default Login;
