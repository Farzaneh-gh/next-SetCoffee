"use client";
import React from "react";
import styles from "./Table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Modal from "@/components/templates/p-admin/products/Modal";

const Table = ({ products }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(-1);
  const handelDeleteProduct = async (id) => {
    swal({
      title: "Are you sure you want to delete this product?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
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
      } else {
        swal.close();
      }
    });
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>price</th>
            <th>Score</th>
            <th>View</th>
            <th>Actiom</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.score}</td>

                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => setOpenModal(product._id)}
                  >
                    View details
                  </button>
                  {openModal === product._id && (
                    <Modal
                      handelCloseModal={() => setOpenModal(-1)}
                      product={product}
                    />
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.reject_btn}
                    onClick={() => handelDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
