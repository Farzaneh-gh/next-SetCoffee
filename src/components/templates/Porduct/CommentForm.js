import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import styles from "./CommentForm.module.css";
import { showSwal } from "@/utils/helper";
import { validateEmail } from "@/validators/auth";
const CommentForm = ({ productId }) => {
  const [error, setError] = useState({});
  const [score, setScore] = useState(-1);
  const [body, setBody] = useState("");
  const [username, setUsername] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [email, setEmail] = useState("");
  const handelSubmitForm = async () => {
    let newEror = {};
    if (!username.trim()) {
      newEror.username = "username is required";
    }
    if (!email.trim()) {
      newEror.email = "email is required";
    }
    if (!body.trim()) {
      newEror.body = "body is required";
    }
    const verifyEmail = validateEmail(email);
    if (!verifyEmail) {
      newEror.email = "email is not valid";
    }

    if (Object.keys(newEror).length) {
      setError(newEror);
      return;
    }
    const comment = { username, body, email, score: score + 1, productId };
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      if (!response.ok) {
        showSwal("something went wrong", "error", "ok");
      }
      if (response.status === 201) {
        const data = await response.json();
   
        showSwal("comment submitted successfully", "success", "ok");
        setBody("");
        setUsername("");
        setEmail("");
        setScore(null);
        setError({});
      }
      if(response.status === 400){
        showSwal("something went wrong, try again", "error", "ok");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Your email address will not be published. Required fields are marked
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rating}>
        <span>Your rating :</span>
        <span>
          {[...Array(5)].map((item, index) => (
            <IoMdStar
              key={index}
              onMouseEnter={() => setScore(index)}
              style={{
                color: index <= score && score >= 0 ? "orange" : "gray",
              }}
              onClick={() => setScore(index)}
            />
          ))}
        </span>
      </div>
      <div className={styles.form}>
        <div>
          <label htmlFor="comment">
            <span style={{ color: "red" }}>*</span> Your review
          </label>
          <textarea
            id="comment"
            name="comment"
            cols="65"
            rows="8"
            required="true"
            placeholder=""
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setError({ ...error, body: "" });
            }}
          ></textarea>
          <p
            style={{
              display: error.body ? "block" : "none",
              color: "red",
              marginTop: ".6rem",
              fontSize: ".8rem",
            }}
          >
            This field is required
          </p>
        </div>
        <div className={styles.group}>
          <div>
            <label>
              <span style={{ color: "red" }}>*</span> Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError({ ...error, username: "" });
              }}
            />
            <p
              style={{
                display: error.username ? "block" : "none",
                color: "red",
                marginTop: ".6rem",
                fontSize: ".8rem",
              }}
            >
              This field is required
            </p>
          </div>

          <div>
            <label>
              {" "}
              <span style={{ color: "red" }}>*</span> Email{" "}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError({ ...error, email: "" });
              }}
            />
            <p
              style={{
                display: error.email ? "block" : "none",
                color: "red",
                marginTop: ".6rem",
                fontSize: ".8rem",
              }}
            >
              This field is required
            </p>
          </div>
        </div>
        <div className={styles.checkbox_container}>
          <input type="checkbox" />
          <p>
            Save my name, email, and website in this browser for the next time I
            comment.
          </p>
        </div>

        <button
          type="submit"
          onClick={handelSubmitForm}
          disabled={disabledButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
