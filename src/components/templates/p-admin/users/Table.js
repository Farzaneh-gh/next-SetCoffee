"use client";
import React from "react";
import styles from "./Table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
const Table = ({ users }) => {
  const router = useRouter();
  const handelChangeRole = async (id) => {
    swal({
      title: "Are you sure?",
      buttons: ["cancel", "ok"],
      icon: "warning",
    }).then(async (result) => {
      if (result) {
        try {
          const response = await fetch(`/api/user/role`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id }),
          });
          if (!response.ok) {
            throw new Error("something went wrong");
          }
          swal({
            title: "Role changed successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => router.refresh());
        } catch (err) {
          console.log(err);
        }
      }
    });
    return;
  };
  const handelDeleteUser = async (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["cancel", "ok"],
      dangerMode: true,
    }).then(async (result) => {
      if (!result) return;
      try {
        const response = await fetch("/api/user", {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error("something went wrong");
        if (response.status === 200)
          swal({
            title: "User deleted successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => router.refresh());
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handelBanUser = async (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["cancel", "ok"],
      dangerMode: true,
    }).then(async (result) => {
      if (!result) return;
      try {
        const response = await fetch("/api/user/ban", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) throw new Error("something went wrong");
        if (response.status === 200) {
          swal({
            title: "User banned successfully",
            icon: "success",
            buttons: "ok",
          }).then(() => {
            router.refresh();
          });
        }
      } catch (err) {
        console.log(err);
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
            <th>Email</th>
            <th>Role</th>
            <th>Edit User</th>
            <th>Edit Role</th>
            <th>Delete</th>
            <th>Ban</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                !user?.isDeleted && (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button type="button" className={styles.edit_btn}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_btn}
                        onClick={() => handelChangeRole(user._id)}
                      >
                        {user.role}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.delete_btn}
                        onClick={() => handelDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button type="button" className={user?.isBanned ? styles.ban_btn : styles.unban_btn} onClick={() => handelBanUser(user._id)}>
                       {user.isBanned?"Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
