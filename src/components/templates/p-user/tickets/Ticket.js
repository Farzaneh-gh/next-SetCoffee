import React from "react";
import styles from "./Ticket.module.css";
import Link from "next/link";
const Ticket = ({
  department,
  date,
  title,
isAnswered,
  ticketId,
}) => {
  return (
    <Link
      href={`/p-user/tickets/answer/${ticketId}`}
      className={styles.container}
    >
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department}</p>
      </div>
      <div>
        <p>{new Date(date).toDateString()}</p>
        <p className={styles.answer}>
          {isAnswered ? "Answered" : "Not Answered"}
        </p>
      </div>
    </Link>
  );
};

export default Ticket;
