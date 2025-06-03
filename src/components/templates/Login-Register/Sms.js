import React from "react";
import styles from "./Sms.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";

function Sms({ hideOtpForm, phone, handleSubmitOTP }) {
  const router = useRouter();
  const [code, setCode] = React.useState("");

  const handelResendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/sms/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      if (response.status === 201) {
        return showSwal("Code sent successfully", "success", "ok");
      } else {
        return showSwal("Failed to send code, please try again", "error", "ok");
      }
    } catch (err) {
      return showSwal("Failed to send code, please try again", "error", "ok");
    }
  };
  return (
    <section className={styles.sms_container}>
      <form className={styles.form}>
        <p>Verification Code</p>
        <span className={styles.code_title}>
          Enter the verification code sent to your phone{" "}
          <span className={styles.number}>{phone}</span>
        </span>

        <input
          type="text"
          className={styles.input}
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" className={styles.btn} onClick={(e)=>handleSubmitOTP(e, code)}>
          Submit
        </button>
        <p className={styles.send_again_code} onClick={handelResendCode}>
          Resend
        </p>
      </form>
      <p className={styles.redirect_to_home} onClick={hideOtpForm}>
        Cancel
      </p>
    </section>
  );
}

export default Sms;
