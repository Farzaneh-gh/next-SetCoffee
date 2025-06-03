"use client";
import React from "react";
import styles from "./Table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Modal from "@/components/templates/p-admin/comments/Modal";

const Table = ({ comments }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(-1);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Score</th>
            <th>Product</th>
            <th>Date</th>
            <th>View</th>
            <th>Satuts</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment?.productId?.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("en-GB")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => setOpenModal(comment._id)}
                  >
                    View
                  </button>
                  {openModal === comment._id && (
                    <Modal
                      title={`${comment.productId.name}`}
                      handelCloseModal={() => setOpenModal(-1)}
                      body={comment.body}
                      commentId={comment._id}
                      adminAnswer={comment.answer}
                    />
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={
                      comment.isPending
                        ? styles.pending_btn
                        : comment.isAccept
                        ? styles.accept_btn
                        : styles.reject_btn
                    }
                  >
                    {comment.isPending
                      ? "Pending"
                      : comment.isAccept
                      ? "Accept"
                      : "Reject"}
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
