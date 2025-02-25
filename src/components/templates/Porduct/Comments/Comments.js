import React from 'react'
import Comment from '@/components/modules/Comment/Comment'
import styles from './Comments.module.css'
import CommentForm from '../CommentForm'

const Comments = ({commentsData}) => {
 const acceptedComments=commentsData.comments.filter(comment=>comment.isAccept)
  return (
    <div className={styles.container}>
      <p className={styles.title}>Comments : </p>
      <hr />

      <div className={styles.columns}>
        <div className={styles.first_column}>
          <p className={styles.subtitle}>
            {acceptedComments.length} reviews for {commentsData.name}
          </p>
          {acceptedComments.map((comment) => (
            <Comment  comment={comment} key={comment._id}/>
          ))}
        
        </div>
        <div className="second_column">
          <p className={styles.subtitle}>Write your review</p>
          <CommentForm productId={commentsData._id}/>
        </div>
      </div>
    </div>
  );
}

export default Comments