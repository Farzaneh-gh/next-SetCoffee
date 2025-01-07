import React from 'react'
import styles from './Product.module.css'
import { CiSearch, CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from 'next/link';
function Product() {
  return (
    <div className={styles.container}>
      <div className={styles.product_image}>
        <img
          src="https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
          alt="product"
        />
        <div className={styles.icons}>
          <Link href="/" className={styles.link}>
            {" "}
            <CiSearch />
            <p className={styles.toltip}>Quick View</p>
          </Link>
          <Link href="/" className={styles.link}>
            {" "}
            <CiHeart />
            <p className={styles.toltip}> Add to Wishlist</p>
          </Link>
        </div>
        <div className={styles.button}>
          <span>Add to Cart</span>
        </div>
      </div>
      <div className={styles.details}>
        <Link href="/" className={styles.title}>
          SETpresso Coffee Capsules Compatible with Nespresso Machines (RED) -
          Pack of 10 - LIMITED EDITION
        </Link>
        <div className={styles.rating}>
          {" "}
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar />
        </div>
        <span>80$</span>
      </div>
    </div>
  );
}

export default Product