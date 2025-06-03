"use client";
import React from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Modal = ({
  title,
  handelCloseModal,
  body,
  commentId,
  adminAnswer = "",
}) => {
  const router = useRouter();
  const [showtextarea, setShowtextarea] = React.useState(false);
  const [answer, setAnswer] = React.useState("");

  const handelSubmitAnswer = async (commentId) => {
    if (!answer) {
      setShowtextarea(true);
      setAnswer(adminAnswer);
      return;
    }
    if (!answer.trim()) {
      swal({
        title: "Please enter the answer",
        icon: "warning",
        buttons: "ok",
      });
      return;
    }
    try {
      const response = await fetch("/api/comments/answer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer, id: commentId }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      if (response.status === 200) {
        swal({
          title: "Answer sent successfully",
          icon: "success",
          buttons: "ok",
        }).then(() => {
          handelCloseModal();
          router.refresh();
        });
      }
      if (response.status === 401) {
        swal({
          title: "You are not authorized to answer this comment",
          icon: "error",
          buttons: "ok",
        });
        return;
      }
    } catch (err) {
      swal({
        title: "Something went wrong please try again",
        icon: "error",
        buttons: "ok",
      });
    }
  };

  const handelAcceptComment = (commentId) => {
    swal({
      title: "Are you sure you want to accept this comment?",
      body: "Once accepted, the comment will be visible to all users.",
      icon: "warning",
      buttons: ["Cancel", "Accept"],
      dangerMode: true,
    }).then(async (result) => {
      if (!result) {
        return;
      }
      try {
        const response = await fetch("/api/comments/accept", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: commentId }),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        if (response.status === 200) {
          swal({
            title: "Comment accepted successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            handelCloseModal();
            router.refresh();
          });
        }
        if (response.status === 401) {
          swal({
            title: "You are not authorized to Accept this comment",
            icon: "error",
            buttons: "ok",
          });
          return;
        }
      } catch (err) {
        swal({
          title: "Something went wrong please try again",
          icon: "error",
          buttons: "ok",
        });
      }
    });
  };

  const handelRejectComment = (commentId) => {
    swal({
      title: "Are you sure you want to reject this comment?",
      body: "Once reject, the comment will be not visible to all users.",
      icon: "warning",
      buttons: ["Cancel", "Reject"],
      dangerMode: true,
    }).then(async (result) => {
      if (!result) {
        return;
      }
      try {
        const response = await fetch("/api/comments/reject", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: commentId }),
        });
        const data = await response.json(); 
        if (response.status === 401) {
          return swal({
            title: "You are not authorized to Reject this comment",
            icon: "error",
            buttons: "ok",
          });
        }

        if (response.status === 200) {
          swal({
            title: "Comment rejected successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            handelCloseModal();
            router.refresh();
          });
        }
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        swal({
          title: "Something went wrong please try again",
          icon: "error",
          buttons: "ok",
        });
      }
    });
  };

  const handelDeleteComment = (commentId) => {
    swal({
      title: "Are you sure you want to delete this comment?",
      body: "Once delete, the comment will be not visible to all users.",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (result) => {
      if (!result) {
        return;
      }
      try {
        const response = await fetch("/api/comments/delete", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: commentId }),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        if (response.status === 200) {
          swal({
            title: "Comment deleted successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            handelCloseModal();
            router.refresh();
          });
        }
      } catch (err) {
        swal({
          title: "Something went wrong please try again",
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
        <p className={styles.title}>{title}</p>
        <hr className={styles.line} />
        <p className={styles.answer_title}>User Comment:</p>
        <p className={styles.body}>{body}</p>
        <hr className={styles.line} />
        {showtextarea && (
          <>
            <p className={styles.answer_title}>Please enter your answer:</p>
            <textarea
              name="answer"
              id="answer"
              cols="30"
              rows="10"
              placeholder="Answer"
              className={styles.textarea}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoFocus
            ></textarea>
          </>
        )}

        <div className={styles.btns}>
          <button type="button" className={styles.edit_btn}>
            Edit
          </button>

          <button
            type="button"
            className={styles.delete_btn}
            onClick={() => handelDeleteComment(commentId)}
          >
            Delete
          </button>

          <button
            type="button"
            className={styles.reject_btn}
            onClick={() => handelRejectComment(commentId)}
          >
            Reject
          </button>
          <button
            type="button"
            className={styles.accept_btn}
            onClick={() => handelAcceptComment(commentId)}
          >
            Approve
          </button>

          <button
            type="button"
            className={styles.answer_btn}
            onClick={() => handelSubmitAnswer(commentId)}
          >
            {showtextarea ? "Submit" : "Answer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
