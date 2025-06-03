import React from 'react'
import styles from "./Tikets.module.css"
import Tiket from './Tiket'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
const Tikets = ({recentTickets}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Recent Tikets
        <div>
          <Link href="/p-user/tickets">View All</Link>
          <FaArrowRight />
        </div>
      </div>
      <main className={styles.tikets}>
      {recentTickets.length>0 && recentTickets.map(ticket=><Tiket key={ticket._id} {...ticket}/>)}
      </main>
        {recentTickets.length===0 &&<p className={styles.no_tikets}>No Tikets</p> }
    </div>
  );
}

export default Tikets