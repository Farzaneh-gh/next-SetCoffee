"use client";
import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Modal = ({ product, handelCloseModal }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(product);
  }, []);
  const handelDeleteProduct = (id) => {
    swal({
      title: "Are you sure you want to delete this product?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (result) => {
      if (!result) {
        return;
      }
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        if (response.status === 200) {
          swal({
            title: "Product deleted successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            handelCloseModal();
            router.refresh();
          });
        }
      } catch (err) {
        swal({
          title: "Something went wrong, please try again",
          icon: "error",
          buttons: "ok",
        });
      }
    });
  };
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <IoClose className={styles.close} onClick={handelCloseModal} />
        <p className={styles.title}>{product.name}</p>
        <hr className={styles.line} />

        <p className={styles.body}>
          <span>Short Description: </span>
          {product.shortDescription}
        </p>
        <p className={styles.body}>
          <span>Long Description: </span>
          {product.longDescription}
        </p>
        <p className={styles.body}>
          <span>Price: </span>
          {product.price}$
        </p>
        <p className={styles.body}>
          <span>weight: </span>
          {product.weight}g
        </p>
        <p className={styles.body}>
          <span>Smell: </span>
          {product.smell}
        </p>
        <p className={styles.body}>
          <span>suitable For: </span>
          {product.suitableFor}
        </p>
        <p className={styles.body}>
          <span>Tags: </span>
          {product.tags.join(",")}
        </p>
        <div>
          {product.image && (
            <img
              src={`data:${product.image.contentType};base64,${product.image.data}`}
              alt={product.name}
              className={styles.img}
            />
          )}
        </div>
        <div className={styles.btns}>
          <button type="button" className={styles.edit_btn}>
            Edit
          </button>

          <button
            type="button"
            className={styles.delete_btn}
            onClick={() => handelDeleteProduct(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
