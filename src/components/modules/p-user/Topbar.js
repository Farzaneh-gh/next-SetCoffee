import React from "react";
import styles from "./TopBar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.profile}>
        <img
          src="/images/shahin.jpg"
          alt="user"
          width={50}
          height={50}
          className={styles.avatar}
        />
        <div>
          <p className={styles.name}>Shahin sh</p>
          <p className={styles.role}>Admin</p>
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.input}>
          <input type="text" placeholder="Search" />
          <IoIosSearch />
        </div>
        <div>
          <IoIosNotifications />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
