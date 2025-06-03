"use client";
import React, { useState } from "react";
import styles from "./TopBar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Modal from "./Modal";
const TopBar = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <img src="/images/shahin.jpg" alt="" className={styles.avatar} />
        <div>
          <p className={styles.name}>Shahin</p>
          <p className={styles.role}>Admin</p>
        </div>
      </div>
      <div className={styles.search_container}>
        <div className={styles.search_input}>
          <input type="search" placeholder="Search" className={styles.search} />
          <div className={styles.icon_container}>
            <IoIosSearch />
          </div>
        </div>

        <div
          className={styles.notification}
          onClick={() => setShowNotification(true)}
        >
          <IoIosNotifications />
          <p className={styles.number}>2</p>
        </div>

        {showNotification && (
          <div className={styles.notification_container}>
            <div>
              <p onClick={()=>setShowModal(true)}>Notification</p>
              <button onClick={() => setShowNotification(false)}>Close</button>
            </div>
            <div>
              <p onClick={()=>setShowModal(true)}>Notification</p>
              <button onClick={() => setShowNotification(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal title="Hello Admin" body="hello Dear Admin you are welcome" handelCloseModal={() => setShowModal(false)}/>
      )}
    </div>
  );
};

export default TopBar;
