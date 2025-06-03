import React from "react";
import Navbar from "@/components/modules/Navbar/Navbar";
import Footer from "@/components/modules/Footer/Footer";
import BreadCrumb from "@/components/modules/Breadcrumb/BreadCrumb";
import { Table } from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import ScrollToTopButton from "@/components/modules/ScrollToTopButton/ScrollToTopButton";

const page = () => {
  return (
    <>
      <Navbar />
      <BreadCrumb route="Cart" />
      <main className={styles.container} data-aos="fade-up">
        <Table />
      </main>
      <Footer />
        <ScrollToTopButton /> 
    </>
  );
}; 

export default page;
