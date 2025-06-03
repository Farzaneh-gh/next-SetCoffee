"use client";
import React, { useEffect, useState } from "react";
import styles from "./AccountDetails.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { validateEmail, validatePhone } from "@/validators/auth";
import { useRouter } from "next/navigation";
const AccountDetails = () => {
  const router=useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userData = async () => {
      const respanse = await fetch("/api/auth/me");
      const data = await respanse.json();

      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    };
    userData();
  }, []);

  const handelSubmit = async () => {
    if (email.trim()) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is not valid",
        }));
        return;
      }
    }
    if (phone.trim()) {
      const isValidPhone = validatePhone(phone);
      if (!isValidPhone) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number is not valid",
        }));
        return;
      }
    }
    const userData = { name, email, phone };
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      swal({
        title: "User updated successfully",
        icon: "success",
        buttons: "ok",
      }).then(async () => {
        const respanse = await fetch("/api/auth/signout", { method: "POST" });
        router.replace("/");
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Account Details</h1>
      </div>
      <main className={styles.main}>
        <div className={styles.col}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="usrname"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            placeholder="phone number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={styles.col}>
          <div className={styles.avatar}>
            <div>
              <img
                src="/images/shahin.jpg"
                alt=""
                width={200}
                height={200}
                className={styles.img}
              />
            </div>
            <div className={styles.btns}>
              <button>
                change <IoCloudUploadOutline />
              </button>
              <button>
                Remove <MdOutlineDelete />
              </button>
            </div>
          </div>
          <div className={styles.password}>
            <label>Password</label>
            <input type="password" placeholder="password" />
          </div>
        </div>
      </main>

      <div className={styles.save}>
        <button onClick={handelSubmit}>Save</button>
      </div>
    </div>
  );
};

export default AccountDetails;
