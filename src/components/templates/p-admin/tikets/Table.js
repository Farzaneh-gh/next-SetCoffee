"use client";
import React from "react";
import styles from "./Table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import AnswerModal from "./AnswerModal";
import Modal from "@/components/templates/p-admin/tikets/Modal";
import { set } from "mongoose";
const Table = ({ tikets }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(null);
  const [openAnswerModal, setOpenAnswerModal] = React.useState(true);
  const [answer, setAnswer] = React.useState("");
  const submitAnswer = async (ticketId) => {
    if (!answer) {
      return swal("Please enter the answer");
    }
    try {
      const response = await fetch("/api/tickets/answer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer, ticketId }),
      });

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      if (response.status === 200) {
        swal("Answer sent successfully");
        setOpenAnswerModal(-1);
        setAnswer("");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      swal("Something went wrong please try again");
    }
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Title</th>
            <th>Department</th>
            <th>View</th>
            <th>Delete</th>
            <th>Answer</th>
            <th>Ban</th>
          </tr>
        </thead>
        <tbody>
          {tikets.length > 0 &&
            tikets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => setOpenModal(ticket._id)}
                  >
                    View
                  </button>
                  {openModal===ticket._id && (
                    <Modal
                      handelCloseModal={() => setOpenModal(null)}
                      body={ticket.body}
                      title={ticket.title}
                    />
                  )}
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={
                      ticket.hasAnswer
                        ? styles.edit_answer_btn
                        : styles.delete_btn
                    }
                    onClick={() => {
                      setOpenAnswerModal(ticket._id);
                      setAnswer(ticket.answer);
                    }}
                  >
                    {ticket.hasAnswer ? "Edit Answer" : "Answer"}
                  </button>
                  {openAnswerModal === ticket._id && (
                    <AnswerModal
                      title={ticket.title}
                      handelCloseModal={() => setOpenAnswerModal(-1)}
                      body={answer}
                      changeAnswer={setAnswer}
                      submitAnswer={() => submitAnswer(ticket._id)}
                    />
                  )}
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    Ban
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
