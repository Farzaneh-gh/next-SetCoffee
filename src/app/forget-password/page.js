"use client";
import styles from "@/styles/forget-password.module.css";
import React from "react";
import Link from "next/link";
function page() {
  return (
    <div className={styles.forget_container}>
      <div className={styles.first_column}>
        <section className={styles.form_container} data-aos="fade-up">
          <input
            type="text"
            placeholder="Email/Phone Number"
            className={styles.input}
          />
          <button className={styles.btn}>Send</button>
          <Link href="/login-register">Back to Login</Link>
          <Link href={"/"} className={styles.redirect_to_home}>
            Cancel
          </Link>
        </section>
      </div>
      <div className={styles.second_column}></div>
    </div>
  );
}

export default page;
