import React from "react";
import TopBar from "../modules/p-admin/TopBar";
import SideBar from "../modules/p-admin/SideBar";
import Styles from "./AdminPanelLayout.module.css";
import { authUser } from "@/utils/serverHelper";
import connectToDB  from "@/configs/db";
import { redirect } from "next/navigation";
const AdminPanelLayout = async({ children }) => {
await connectToDB();
const user=await authUser();

if(!user){redirect("/login-register")}
if(user.role!=="ADMIN"){redirect("/p-user")}
  return (
    <div className={Styles.conatiner}>
      <SideBar />
      <div>
        <TopBar />
        <div> {children} </div>
      </div>
    </div>
  );
};

export default AdminPanelLayout;
