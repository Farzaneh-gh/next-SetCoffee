import React from 'react'
import styles from "./Tiket.module.css"
import Link from 'next/link'
const Tiket = ({hasAnswer,department,createdAt,title,_id}) => {
  return (
    <Link href={`/p-user/tickets/answer/${_id}`} className={styles.container}>
      <div>
        <p>{title}</p>
        <p>{new Date(createdAt).toLocaleString("en-US")}</p>
      </div>
      <div>
        <p className={styles.department}>{department.title}</p>
        <p className={styles.no_answer}>{hasAnswer ? "Answered" : "Not Answered"}</p>
      </div>
    </Link>
  );
}

export default Tiket