import React from "react";
import styles from "./Product.module.css";
import { CiSearch, CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from "next/link";
function Product({ product }) {
  if (!product || Object.keys(product).length === 0) {
    return 
  }
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
        <Link href={`/product/${product._id}`} className={styles.title}>
          {product.name}
          <p>{product.shortDescription}</p>
        </Link>
        <div className={styles.rating}>
          {[...Array(Math.min(5, Math.max(0, product.score || 0)))].map(
            (_, index) => (
              <FaStar key={index} />
            )
          )}
          {[...Array(Math.max(0, 5 - (product.score || 0)))].map((_, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <span>{product.price}</span>
      </div>
    </div>
  );
}

export default Product;
