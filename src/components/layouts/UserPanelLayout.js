import React from "react";
import styles from "./userPanelLayout.module.css"
import Topbar from "@/components/modules/p-user/Topbar";
import Sidebar from "@/components/modules/p-user/Sidebar";
import { authUser } from "@/utils/serverHelper";
const UserPanelLayout = ({ children }) => {
  const user = authUser();
  if (!user) {
    redirect("/login-register");
  }
  return (
    <div className={styles.container_user_panel}>
      <Sidebar />
      <div className={styles.content}>
        <Topbar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default UserPanelLayout;
