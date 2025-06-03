import React from "react";
import styles from "./Answer.module.css";
const Answer = ({role,name,date,body}) => {
  return (
    <div
      className={
        role == "USER" ? styles.user_container : styles.admin_container
      }
    >
      <div className={styles.header}>
        <div className={styles.user}>
          <img src="/images/shahin.jpg" />
          <div>
            <p>{name}</p>
            <p className={styles.role}>{role}</p>
          </div>
        </div>
        <p>{new Date(date).toDateString()}</p>
      </div>
      <p className={role == "USER" ? styles.user_answer : styles.admin_answer}>
       {body}
      </p>
    </div>
  );
};

export default Answer;
