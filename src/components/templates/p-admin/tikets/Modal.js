import React from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
const Modal = ({ title, handelCloseModal, body }) => {
  console.log(body);
  return (
    <div className={styles.modal} onClick={handelCloseModal}>
      <div className={styles.content}>
        <IoClose className={styles.close} onClick={handelCloseModal} />
        <p className={styles.title}>{title}</p>
        <hr />
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Modal;
