"use client";
import React from "react";
import styles from "./DataTable.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { showSwal } from "@/utils/helper";
const DataTable = ({ comments }) => {
 const handleView = (body) => {
     showSwal(body, "info", "ok");
 }
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Product</th>
            <th>Score</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{new Date(comment.date).toLocaleDateString("en-GB")}</td>
                <td>{comment.productId.name}</td>
                <td className={styles.rating}>
                  {new Array(comment?.score).fill(0).map((item, index) => (
                    <FaStar key={index} />
                  ))}
                  {new Array(5 - comment?.score).fill(0).map((item, index) => (
                    <FaRegStar key={index} />
                  ))}
                </td>
                <td>
                  <button className={styles.no_check}>{comment.isAccept?"Accepted":"Pending"}</button>
                </td>
                <td>
                  <button className={styles.btn}onClick={()=>handleView(comment.body)}>view</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
