"use client";
import React from "react";
import styles from "./Product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { showSwal } from "@/utils/helper";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
const Product = ({ price, score, name, productId }) => {

  const router = useRouter();
  const handelRemoveProduct = async () => {
    swal({title:"Are you sure?",icon:"warning",buttons:["cancel","ok"],dangerMode:true}).then(async (result) => {
      if (result) {
        if (!productId) return;

        try {
          const response = await fetch(`/api/wishList/${productId}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
          }
          if (response.status === 200) {
            swal({title: "Product removed from wishlist", icon: "success", buttons: "ok"}).then(()=>location.reload());
            return
          }
          if (response.status === 404) {
            showSwal("Product not found", "error", "ok");
            return
          }
          if (response.status === 401) {
            redirect("/login-register");
          }
        } catch (err) {
          console.log(err);
          showSwal("something went wrong", "error", "ok");
        }
      }
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
          alt=""
          width={283}
          height={283}
        />
      </div>
      <p className={styles.title}>{name}</p>
      <div className={styles.price}>
        <span>{price} $</span>
        <div>
          {[...Array(Math.min(5, Math.max(0, score || 0)))].map((_, index) => (
            <FaStar key={index} />
          ))}
          {[...Array(Math.max(0, 5 - (score || 0)))].map((_, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
      </div>
      <button className={styles.remove} onClick={handelRemoveProduct}>
        Remove
      </button>
    </div>
  );
};

export default Product;
