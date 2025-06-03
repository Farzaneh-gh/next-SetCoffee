import React from "react";
import styles from "./AnswerModal.module.css";
import { IoClose } from "react-icons/io5";
const AnswerModal = ({
  title,
  handelCloseModal,
  body,
  changeAnswer,
  submitAnswer,

}) => {

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <IoClose onClick={handelCloseModal} className={styles.close} />
        </div>
        <section className={styles.body}>
          <textarea
            name="answer"
            id="answer"
            cols="30"
            rows="20"
            placeholder="Answer......"
            value={body}
            onChange={(e) => changeAnswer(e.target.value)}
          ></textarea>
          <button type="submit" onClick={submitAnswer}>
            submit
          </button>
        </section>
      </div>
    </div>
  );
};

export default AnswerModal;
