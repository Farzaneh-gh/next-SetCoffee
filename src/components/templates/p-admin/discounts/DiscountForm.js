"use client";
import React , { useState } from "react";
import styles from "./DiscountForm.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
const DiscountForm = ({ products }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [maxUse, setMaxUse] = useState("");
  const [product, setProduct] = useState("");

  const router = useRouter();

  const handelSubmit = async () => {
    const data = {
      code: discountCode,
      discount: discountPercentage,
      maxUsePerUser: maxUse,
      product,
    };
    try {
      const response = await fetch("/api/discounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      if (response.status === 201) {
        swal({
          title: "Discount created successfully",
          icon: "success",
          buttons: "ok",
        }).then(() => {
            setDiscountCode("");
            setDiscountPercentage("");
            setMaxUse("");
            setProduct("");
          router.refresh();
        });
      }
    } catch (err) {
      swal({ title: err.message, icon: "error", buttons: "ok" });
    }
  };


  return (
    <section className={styles.create_discount}>
      <p>Create Discount</p>
      <div className={styles.row}>
        <div>
          <label htmlFor="title">Discount Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter discount title"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="percentage">Discount Percentage</label>
          <input
            type="text"
            id="percentage"
            placeholder="Enter discount percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div>
          <label htmlFor="title">Maximum Use</label>
          <input
            type="text"
            id="title"
            placeholder="Enter maximum use"
            value={maxUse}
            onChange={(e) => setMaxUse(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="percentage">Product</label>
          <select
            name="product"
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        onClick={handelSubmit}
        className={styles.create_btn}
      >
        Create Discount
      </button>
    </section>
  );
};

export default DiscountForm;
