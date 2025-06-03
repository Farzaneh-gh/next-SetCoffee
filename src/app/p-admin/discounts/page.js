import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-admin/discounts.module.css";
import DiscountForm from "@/components/templates/p-admin/discounts/DiscountForm";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import DiscountModel from "@/models/Discount";
import Table from "@/components/templates/p-admin/discounts/Table";
const page = async () => {
  await connectToDB();
  const products = await ProductModel.find({}, "-__v");
  const discounts = await DiscountModel.find(
    { $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }] },
    "-__v"
  )
    .populate("product", "-__v")
    .populate("createdBy", "-__v")
    .sort({ _id: -1 })
    .lean();
  return (
    <AdminPanelLayout>
      <DiscountForm products={JSON.parse(JSON.stringify(products))} />
      <main className={styles.discounts}>
        <Table discounts={JSON.parse(JSON.stringify(discounts))} />
      </main>
    </AdminPanelLayout>
  );
};

export default page;
