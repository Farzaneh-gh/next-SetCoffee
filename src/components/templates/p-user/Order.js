import React from "react";
import styles from "./Order.module.css";
import Link from "next/link";
import { BsCurrencyEuro } from "react-icons/bs";

const Order = () => {
  return (
    <Link href="/product/123" className={styles.container}>
      <div className={styles.row}>
        <div className={styles.row}>
          <img
            src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
            alt=""
          />
          <p>Arabica Ethiopia</p>
        </div>
        <div className={styles.row}> 
          <p>2024/01/11 </p>
          <p>8:25 </p>
        </div>
      </div>

      <div className={styles.row}>
        <p>Completed</p>
        <p>
          {" "}
          65 <BsCurrencyEuro />{" "}
        </p>
      </div>
    </Link>
  );
};

export default Order;
