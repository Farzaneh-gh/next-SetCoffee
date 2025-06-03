import React from "react";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import Signout from "./Signout";
import { TbListDetails } from "react-icons/tb";
const SideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wellcome}>
        <p>Wellcome shahin</p>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link href="/p-admin">
            {" "}
            <ImReply />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/p-admin/comments">
            {" "}
            <FaComments />
            Comments
          </Link>
        </li>
        <li>
          <Link href="/p-admin/tickets">
            {" "}
            <MdSms />
            Tickets
          </Link>
        </li>
        <li>
          <Link href="/p-admin/users">
            {" "}
            <FaUsers />
            Users
          </Link>
        </li>
        <li>
          <Link href="/p-admin/products">
            {" "}
            <FaShoppingBag />
            Products
          </Link>
        </li>
        <li>
          <Link href="/p-admin/discounts">
            {" "}
            <MdOutlineAttachMoney />
            Discounts
          </Link>
        </li>
      </ul>
      <div className={styles.logout}>
        <Signout />
      </div>
    </div>
  );
};

export default SideBar;
