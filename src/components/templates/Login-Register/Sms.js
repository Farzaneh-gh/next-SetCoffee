import React from "react";
import styles from "./Sms.module.css";
import Link from "next/link";
function Sms({hideOtpForm}) {
  return (
    <section className={styles.sms_container}>
      <form className={styles.form}>
        <p>Verification Code</p>
        <span className={styles.code_title}>
          Enter the verification code sent to your phone{" "}
          <span className={styles.number}>644****38</span>
        </span>

        <input type="text" className={styles.input} placeholder="Code" />
        <button type="submit" className={styles.btn}>
          Submit
        </button>
        <p className={styles.send_again_code}>Resend</p>
      </form>
      <p className={styles.redirect_to_home} onClick={hideOtpForm}>
        Cancel
      </p>
    </section>
  );
}

export default Sms;
