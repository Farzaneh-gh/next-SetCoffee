import React from "react";
import styles from "./Comment.module.css";
import { FaStar,FaRegStar } from "react-icons/fa";
const Comment = ({comment}) => {
 
  return (
    <div className={styles.comment_container}>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
        </div>

        <div className={styles.comment}>
          <div className={styles.comment_header}>
            <div className={styles.title}>
              <span>{comment.username}</span>
              <span>{new Date(comment.date).toLocaleDateString("en-GB")}</span>
            </div>
            <div className={styles.rating}>
              {new Array(comment?.score).fill(0).map((item,index)=><FaStar key={index} />)}
              {new Array(5-comment?.score).fill(0).map((item,index)=><FaRegStar key={index} />)}
              
            </div>
          </div>  
          <p>{comment.body}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Comment;
