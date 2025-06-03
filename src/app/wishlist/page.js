import React from "react";
import Navbar from "@/components/modules/Navbar/Navbar";
import Footer from "@/components/modules/Footer/Footer";
import BreadCrumb from "@/components/modules/Breadcrumb/BreadCrumb";
import styles from "@/styles/wishlish.module.css";
import Product from "@/components/modules/Product/Product";
import { authUser } from "@/utils/serverHelper";
import WishlistModel from "@/models/WishList";
import { redirect } from "next/navigation";
const page = async () => {
  const user = await authUser();
  if(!user) {redirect("/login-register");}
  const userWishList = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );

  return (
    <div>
      <Navbar isLogged={user} />
      <BreadCrumb route="Wishlist" />
      <div className={styles.container} data-aos="fade-up">
        <p className={styles.title}>Your Wishlist :</p>
        <hr />
        {userWishList.length === 0 && 
          <div className={styles.empty}>
            <p>Wishlist is empty</p>
          </div>}
        <main className={styles.products}>
          {userWishList.length>0  && userWishList.map((item) => (
            <Product key={item._id} product={item.product} />
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default page;
