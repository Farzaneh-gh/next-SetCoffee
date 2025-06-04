export const dynamic = "force-dynamic";

import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-admin/products.module.css";
import Table from "@/components/templates/p-admin/products/Table";
import productModel from "@/models/Product";
import connectToDB from "@/configs/db";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";
const page = async () => {
  await connectToDB();
  const products = await productModel
    .find({ isDeleted: { $exists: false } })
    .populate("comments")
    .lean()
    .sort({ _id: -1 });

  return (
    <AdminPanelLayout>
      <div className={styles.conatiner}>
        <AddProduct />
        <div className={styles.title}>
          <h1>Product List</h1>
        </div>
        <div className={styles.table_container}>
          <Table products={JSON.parse(JSON.stringify(products))} />
        </div>
      </div>
    </AdminPanelLayout>
  );
};

export default page;
