"use client";
import React, { useEffect, useState } from "react";
import styles from "./CartItem.module.css";
import { IoMdClose } from "react-icons/io";

const CartItem = ({ item, handelChangequantity, handelDeleteItem }) => {
  const [quantity, setQuantity] = useState(item.count);

  const handleQuantityDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0)); 
  };

  const handleQuantityIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    handelChangequantity(item._id, quantity);
  }, [quantity]);

  return (
    <tr className={styles.container}>
      <td>
        <img
          src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
          alt="cart"
          className={styles.image}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.price.toLocaleString("en-US")} €</td>
      <td>
        <div className={styles.quantity_container}>
          <button className={styles.button} onClick={handleQuantityDecrement}>
            -
          </button>
          <p className={styles.quantity}>{quantity}</p>
          <button className={styles.button} onClick={handleQuantityIncrement}>
            +
          </button>
        </div>
      </td>
      <td className={styles.total}>
        {(Number(item.price) * quantity).toLocaleString("en-US")} €
      </td>
      <td>
        <IoMdClose
          className={styles.delete_icon}
          onClick={() => handelDeleteItem(item._id)}
        />
      </td>
    </tr>
  );
};

export default CartItem;
