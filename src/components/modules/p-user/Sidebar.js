
import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Signout from "./Signout";
const Sidebar = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.wellcome}>
        <p>Wellcome shahin</p>
      </div>

      <ul className={styles.menu}>
        <li className={styles.link}>
          {" "}
          <Link href={"/p-user"} className={styles.sidebar_link_active}>
            <ImReply />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href={"/p-user/orders"}>
            <FaShoppingBag />
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <Link href={"/p-user/tickets"}>
            <MdSms />
            Tickets
          </Link>
        </li>
        <li>
          {" "}
          <Link href={"/p-user/comments"}>
            <FaComments />
            Comments
          </Link>
        </li>
        <li>
          {" "}
          <Link href={"/p-user/wishlist"}>
            <FaHeart />
            Wishlist
          </Link>
        </li>
        <li>
          {" "}
          <Link href={"/p-user/account-details"}>
            <TbListDetails />
            Account Details
          </Link>
        </li>
      </ul>
      <div className={styles.logout}>
      <Signout /> 
      </div>
    </div>
  );
};

export default Sidebar;
