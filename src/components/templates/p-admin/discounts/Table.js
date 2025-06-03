"use client";
import React from "react";
import styles from "./Table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";


const Table = ({ discounts }) => {
  const router = useRouter();
  
  const handleDelete = async (id) => {
    swal({
      title: "Are you sure you want to delete this discount?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (result) => {
      if (!result) {
        return;
      }
      try {
        const response = await fetch("/api/discounts", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error("something went wrong");
        if (response.status === 200)
          swal({
            title: "Discount deleted successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            router.refresh();
          });
      } catch (err) {
       swal({
          title: "Something went wrong",
          icon: "error",
          buttons: "ok",
        });
      }
    })
  }
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Product</th>
            <th>Discount</th>
            <th>Start Date</th>
            <th>Total Orders</th>
            <th>Sum of Orders</th>
            <th>created By </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {discounts.length > 0 &&
            discounts.map((discount, index) => (
              <tr key={discount._id}>
                <td>{index + 1}</td>
                <td>{discount.code}</td>
                <td>{discount.product.name}</td>
                <td>{discount.discount}</td>
                <td>
                  {new Date(discount.DateCreated).toLocaleDateString("en-GB")}
                </td>
                <td>{discount.maxUsePerUser}</td>
                <td>{discount.totalUse}</td>
                <td>{discount.createdBy.name}</td>
                <td>
                  <button type="button" className={styles.delete_btn} onClick={() => handleDelete(discount._id)}>
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
