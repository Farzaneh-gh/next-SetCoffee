
"use client";
import React from 'react'
import { MdLogout } from "react-icons/md";
import styles from './Signout.module.css'
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
const Signout = () => {
const router=useRouter()
    const handleLogout = () => {
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: ["cancel", "ok"],
        dangerMode: true,
      }).then(async (result) => {
        if (!result) return;
        const response = await fetch("/api/auth/signout", { method: "POST" });
        if (response.status === 200) {
          router.replace("/");
        }
      });
    };

  return (
    <div className={styles.logout} onClick={handleLogout}>
      <MdLogout />
      <p>Logout</p>
    </div>
  );
}

export default Signout