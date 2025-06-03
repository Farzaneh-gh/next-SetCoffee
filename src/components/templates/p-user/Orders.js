import React from 'react'
import styles from "./Orders.module.css"
import Order from './Order'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
const Orders = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p> Recent Orders</p>
        <div>
          <Link href="/p-user/tikets">View All</Link>
          <FaArrowRight />
        </div>
      </div>
      <section className={styles.orders}>
     {/*  <Order />
      <Order />
      <Order /> */}
      </section> 
       <p className={styles.no_orders}>No Orders</p> 
    </div>
  );
}

export default Orders