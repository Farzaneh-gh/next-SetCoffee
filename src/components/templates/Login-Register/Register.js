"use client";
import styles from "./Register.module.css";
import Link from "next/link";
import { useState } from "react";
import Sms from "./Sms";
import { showSwal } from "@/utils/helper";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/validators/auth";
import { useRouter } from "next/navigation";
function Register({ showLoginForm }) {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handelRegisterWithPass = (e) => {
    e.preventDefault();
    if (!isRegisterWithPass) {
      setIsRegisterWithPass(true);
      setIsRegisterWithOtp(false);
    } else {
      signup();
    }
  };
  const showOtpForm = async(e) => {
    e.preventDefault();
    if (!name.trim()) {
      return showSwal("Enter valid Name", "error", "OK");
    }

    if (email) {
      const verifyEmail = validateEmail(email);
      if (!verifyEmail)
        return showSwal("Enter valid Email Address", "error", "OK");
    }

    const verifyPhon = validatePhone(phone);
    if (!verifyPhon) {
      return showSwal("Enter valid phone number", "error", "OK");
    }
    try {
      const response = await fetch("/api/auth/signup-sms/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, phone, email }),
      });
      if (response.status === 201) {
        setIsRegisterWithOtp(true);
        setIsRegisterWithPass(false);
        return;
      }
      if (response.status=== 409) {
        console.log("response", response.status);
        return showSwal("Phone number or Email is exist", "error", "ok");
      }
     else return showSwal("Failed to send code, please try again", "error", "ok");
    } catch (err) {
      return showSwal("Failed to send code, please try again", "error", "ok");
    }
  };

  const signup = async () => {
    if (!name.trim()) {
      return showSwal("Enter valid Name", "error", "OK");
    }

    if (email) {
      const verifyEmail = validateEmail(email);
      if (!verifyEmail)
        return showSwal("Enter valid Email Address", "error", "OK");
    }

    const verifyPhon = validatePhone(phone);
    if (!verifyPhon) {
      return showSwal("Enter valid phone number", "error", "OK");
    }

    const verifyPassword = validatePassword(password);
    if (!verifyPassword) {
      return showSwal("Enter Strong and valid password", "error", "OK");
    }
    const userData = { name, phone, email, password };
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.status === 201) {
      showSwal("User registerd successfully", "success", "Enter");
    }
    if (res.status === 422 || res.status === 204) {
      const responseData = await res.json();
      const message = responseData.message;
      showSwal(message, "error", "OK");
    }
  };

  const handelRegisterWithOtp = async (e, code) => {
    e.preventDefault();

    if (!code.trim()) {
      return showSwal("Enter valid code", "error", "OK");
    }

    const userData = { name, phone, email, code };
    const res = await fetch("/api/auth/signup-sms/verify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.status === 201) {
      swal(
        "User registerd successfully",
        "success",
        "OK"
      ).then(() => router.push("/"));
    }
    if (res.status === 409 || res.status === 204) {
      const responseData = await res.json();
      const message = responseData.message;
      showSwal(message, "error", "OK");
    }
  };

  return (
    <>
      {isRegisterWithOtp ? (
        <Sms
          hideOtpForm={() => setIsRegisterWithOtp(false)}
          handleSubmitOTP={handelRegisterWithOtp}
        />
      ) : (
        <section className={styles.login_container}>
          <form>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isRegisterWithPass && (
              <input
                type="Password"
                placeholder="Password"
                className={styles.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}

            <button type="submit" className={styles.btn} onClick={showOtpForm}>
              Sign Up with Verification Code
            </button>

            <button
              className={styles.btn}
              type="submit"
              onClick={handelRegisterWithPass}
            >
              Sign Up with Password
            </button>
            <span className={styles.back} onClick={showLoginForm}>
              Back to Login
            </span>
          </form>
          <Link href={"/"} className={styles.redirect_to_home}>
            Cancel
          </Link>
        </section>
      )}
    </>
  );
}

export default Register;
