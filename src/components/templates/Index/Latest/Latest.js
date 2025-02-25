import React from "react";
import styles from "./Latest.module.css";
import Product from "@/components/modules/Product/Product";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { getAllPrdoucts } from "@/utils/product";
async function Latest() {
  const products = await getAllPrdoucts();
  return (
    <div className="container">
      <section className={styles.header}>
        <p>Latest Products</p>
        <Link href="/" className={styles.link}>
          View All
          <FaChevronRight />
        </Link>
      </section>
      <main className={styles.Products} data-aos="fade-up">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      
      </main>
    </div>
  );
}

export default Latest;
