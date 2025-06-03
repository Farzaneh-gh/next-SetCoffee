"use client";
import React, { useState } from "react";
import Register from "@/components/templates/Login-Register/Register";
import Login from "@/components/templates/Login-Register/Login";
import styles from "@/styles/login-register.module.css";
import { authTypes } from "@/utils/constant";

const Page=()=> {
  const [authType, setAuthType] = useState(authTypes.LOGIN);
  const showLoginForm = () => {
    setAuthType(authTypes.LOGIN);
  };
  const showRegisterForm = () => {
    setAuthType(authTypes.REGISTER);
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.first_column}>
        {authType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showLoginForm={showLoginForm} />
        )}
      </div>
      <div className={styles.second_column}></div>
    </div>
  );
}

export default Page;
