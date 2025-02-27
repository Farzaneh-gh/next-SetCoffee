"use client";
import React, { useState } from "react";
import styles from "./From.module.css";
import { validateEmail, validatePhone } from "@/validators/auth";
import { showSwal } from "@/utils/helper";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "This field is required",
      }));
      return;
    }
    if (!email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "This field is required",
      }));
      return;
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is not valid",
      }));
      return;
    }
    if (!message.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "This field is required",
      }));
      return;
    }
    if (phone.trim() && !validatePhone(phone)) {
      console.log(phone);
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number is not valid",
        }));
        return;
      }
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, company, phone, message }),
      });

      if (!res.ok) {
        showSwal(" try again !!!", "error", "ok");
        return;
      }
      if (res.status !== 201) {
        showSwal("Something went wrong!! try later", "error", "ok");
        return;
      }
      showSwal("Message sent successfully", "success", "ok");
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setMessage("");
      setErrors({});
      return;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Contact Us Form</p>
      <p className={styles.subtitle}>
        To contact us, you can fill out the form below.
      </p>
      <div className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="name">Name and Surname</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
              }}
            />
            <p
              style={{ color: "red", fontSize: "0.8rem", marginTop: "0.2rem" }}
            >
              {errors.name}
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value),
                  setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
              }}
            />
            <p
              style={{ color: "red", fontSize: "0.8rem", marginTop: "0.2rem" }}
            >
              {errors.email}
            </p>
          </div>
        </div>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              name="company"
              id="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value),
                  setErrors((prevErrors) => ({ ...prevErrors, company: "" }));
              }}
            />
            <p
              style={{ color: "red", fontSize: "0.8rem", marginTop: "0.2rem" }}
            >
              {errors.company}
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value),
                  setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
              }}
            />
            <p
              style={{ color: "red", fontSize: "0.8rem", marginTop: "0.2rem" }}
            >
              {errors.phone}
            </p>
          </div>
        </div>

        <div className={styles.input}>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value),
                setErrors((prevErrors) => ({ ...prevErrors, message: "" }));
            }}
          ></textarea>
          <p style={{ color: "red", fontSize: "0.8rem", marginTop: "0.2rem" }}>
            {errors.message}
          </p>
        </div>
        <button className={styles.submit} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
