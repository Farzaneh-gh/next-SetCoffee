import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import React from "react";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import { authUser } from "@/utils/serverHelper";
import connectToDB from "@/configs/db";
import wishlistModel from "@/models/WishList";


const page = async () => {
  const user = await authUser();
  await connectToDB();
  const productsData = await wishlistModel
    .find({ user: user._id })
    .populate("product");
const products = JSON.parse(JSON.stringify(productsData));
  return (
    <UserPanelLayout>
      <main className={styles.container}>
        <div className={styles.title}>
          <p>Wishlist</p>
        </div>
        <div className={styles.products}>
          {products.length > 0 ? (
            products.map((item) => (
              <Product
                key={item.product._id}
                name={item.product.name}
                price={item.product.price}
                score={item.product.score}
               productId={item.product._id}
          
              />
            ))
          ) : (
            <div className={styles.empty}>
              <p>Wishlist is empty</p>
            </div>
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
};

export default page;
