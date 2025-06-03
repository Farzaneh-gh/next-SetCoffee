"use client";
import React from "react";
import Breadcrumb from "./Breadcrumb";
import styles from "./Detail.module.css";
import { FaFacebookF, FaStar, FaTwitter, FaRegStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import AddToWishlist from "./AddToWishlist";
import Link from "next/link";

function Detail({ productData }) {
  const [count, setCount] = React.useState(1);

  const addTocart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isItemIncart = cart.some((item) => item._id === productData._id);
    console.log(isItemIncart);
    if (isItemIncart) {
      cart.forEach((item) => {
        if (item._id === productData._id) {
          item.count += count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      swal({
        title: "Product Added to Cart",
        icon: "success",
        button: "OK",
      });
      return ;
    }

    const { _id, name, price } = productData;
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { _id, name, price, count }])
    );
    swal({
      title: "Product Added to Cart",
      icon: "success",
      button: "OK",
    });
  };

  const acceptedComments = productData.comments.filter(
    (comment) => comment.isAccept
  ).length;
  return (
    <div>
      <Breadcrumb route={productData.name} />
      <div className={styles.container}>
        <h1 className={styles.title}>{productData.name}</h1>
        <div className={styles.rating}>
          {new Array(productData.score).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - productData.score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
          <p>({acceptedComments} Reviews)</p>
        </div>
        <div className={styles.prices}>
          <p>{productData.price.toLocaleString("en-US")}$</p>
        </div>
        <p className={styles.description}>{productData.shortDescription}</p>
        <hr />
        <div className={styles.stock}>
          <IoCheckmark />
          <p>In Stock</p>
        </div>
        <div className={styles.cart}>
          <div className={styles.quantity}>
            <span onClick={() => setCount((prev) => prev + 1)}>+</span>
            <span>{count}</span>
            <span onClick={() => setCount((prev) => {
              if (prev > 1) {
                return prev - 1;
              }
              return prev;
            })}>-</span>
          </div>
          <button onClick={addTocart}>Add to Cart</button>
        </div>
        <div className={styles.wishlist}>
          <AddToWishlist product={productData._id} />
          <div>
            <TbSwitch3 />
            <span>Compare</span>
          </div>
        </div>
        <hr />
        <div className={styles.details}>
          <strong>Product ID: GOLD Nespresso Compatible Capsule</strong>
          <p>
            <strong>Tags:</strong>{" "}
            {productData.tags.map((tag) => tag).join(", ")}
          </p>
        </div>

        <div className={styles.share}>
          <p>Share:</p>
          <Link href="/">
            <FaTelegram />
          </Link>
          <Link href="/">
            <FaLinkedinIn />
          </Link>
          <Link href="/">
            <FaPinterest />
          </Link>
          <Link href="/">
            <FaTwitter />
          </Link>
          <Link href="/">
            <FaFacebookF />
          </Link>
        </div>

        <hr />
      </div>
    </div>
  );
}

export default Detail;
