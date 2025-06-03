import React from "react";
import styles from "@/styles/p-user.module.css";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import Box from "@/components/templates/p-user/Box";
import Tikets from "@/components/templates/p-user/Tikets";
import Orders from "@/components/templates/p-user/Orders";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelper";
import CommentModel from "@/models/Comment";
import TicketModel from "@/models/Ticket";
import wishListModel from "@/models/WishList";
const page = async () => {
  const user = await authUser();
  connectToDB();
  const totalTickets = await TicketModel.countDocuments({ user: user._id });
  const totalComments = await CommentModel.countDocuments({ userId: user._id,});
  const totalWishList = await wishListModel.countDocuments({user: user._id});
  const recentTickets = await TicketModel.find({ user: user._id }).populate("department", "title")
    .sort({ createdAt: -1 })
    .limit(3);
  return (
    <UserPanelLayout>
      <main className={styles.container}>
        <div className={styles.boxes}>
          <Box title="Total Tickets" value={totalTickets} />
          <Box title="Total Comments" value={totalComments} />
          <Box title="Total Orders" value="2" />
          <Box title="Total Wishlist Items" value={totalWishList} />
        </div>
        <section className={styles.section}>
          <Tikets recentTickets={JSON.parse(JSON.stringify(recentTickets))} />
          <Orders />
        </section>
      </main>
    </UserPanelLayout>
  );
};

export default page;
