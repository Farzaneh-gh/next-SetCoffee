export const dynamic = "force-dynamic";

import React from "react";
import styles from "@/styles/p-admin/users.module.css";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import Table from "@/components/templates/p-admin/users/Table";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
const page = async () => {
  connectToDB();
  const users = await UserModel.find({});
  return (
    <AdminPanelLayout>
      <div className={styles.conatiner}>
        <div className={styles.title}>
          <h1>Users List</h1>
        </div>
        <div className={styles.table_container}>
          {users.length > 0 ? (
            <Table users={JSON.parse(JSON.stringify(users))} />
          ) : (
            <p className={styles.empty}>No Users</p>
          )}
        </div>
      </div>
    </AdminPanelLayout>
  );
};

export default page;
