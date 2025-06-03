"use client";
import React from "react";
import { MdLogout } from "react-icons/md";
import styles from "./Signout.module.css";
import { useRouter } from "next/navigation";
const Signout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const rspose = await fetch("/api/auth/signout", { method: "POST" });
      if (rspose.status === 200) {
        router.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.logout} onClick={handleLogout}>
      <p>Logout</p>
      <MdLogout />
    </div>
  );
};

export default Signout;
