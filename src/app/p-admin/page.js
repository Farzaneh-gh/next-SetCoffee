import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-admin.module.css";
import Box from "@/components/templates/p-admin/Box";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import SaleChart from "@/components/templates/p-admin/index/SaleChart";
import GrowthChart from "@/components/templates/p-admin/index/GrowthChart";



const page = async () => {
  await connectToDB();
  const tickets = await TicketModel.countDocuments({});
  const products = await ProductModel.countDocuments({});
  const users = await UserModel.countDocuments({});

  return (
    <AdminPanelLayout>
      <main className={styles.container}>
        <section className={styles.boxes}>
          <Box title="Total Received Tickets" value={tickets} />
          <Box title="Total Site Products" value={products} />
          <Box title="Total Orders" value="333" />
          <Box title="Total Site Users" value={users} />
        </section>
        <div className={styles.dashboard_charts}>
          <section>
            <p>Monthly Sales Report</p>
            <SaleChart />
          </section>

          <section>
            <p>Growth Rate</p>
            <GrowthChart />
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  );
};

export default page;
