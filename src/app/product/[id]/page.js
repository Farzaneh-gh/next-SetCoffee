import React from "react";
import Gallery from "@/components/templates/Porduct/Gallery";
import styles from "@/styles/product.module.css";
import Navbar from "@/components/modules/Navbar/Navbar";
import Footer from "@/components/modules/Footer/Footer";
import Detail from "@/components/templates/Porduct/Detail";
import MoreProducts from "@/components/templates/Porduct/MoreProducts";
import Tabs from "@/components/templates/Porduct/Tabs";
import { authUser } from "@/utils/auth";
import { getProduct,getRelatedProducts } from "@/utils/product";
const page = async ({ params }) => {
  const { id } = await params

  const productData = await getProduct(id);
  const user = await authUser();
 const relatedProducts=await getRelatedProducts(productData.tags,productData._id);

  return (
    <>
      <div className={styles.container}>
        <Navbar isLogged={user} />
        <div data-aos="fade-up" className={styles.contents}>
          <section className={styles.product_container}>
            <Gallery />
            <Detail productData={productData} />
          </section>
        </div>
        <Tabs productData={productData} />
         <MoreProducts products={relatedProducts}/>
      </div>
      <Footer />
    </>
  );
};

export default page;
