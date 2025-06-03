"use client";
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import CartItem from "@/components/modules/cart/CartItem";
import { TbShoppingCartX } from "react-icons/tb";
import Link from "next/link";
import Select from "react-select";
import arbol from "@/utils/arbol.json";

//When you import a .json file in a React (or Next.js) project, you don't need to use JSON.parse(),
//  because the import already gives you a parsed JavaScript object.

const provinceOptions = arbol.map((community) => ({
  value: community.code,
  label: community.label,
  provinces: community.provinces,
}));

export const Table = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartStorage);
  }, []);



  const handelChangequantity = (id, quantity) => {
    setCartItems((prevItems) => {
      const newData = prevItems.map((item) => {
        if (item._id === id) {
          return { ...item, count: quantity };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newData));
      return newData;
    });
  };

  const handelDeleteItem = (id) => {
    setCartItems((prevItems) => {
      const newData = prevItems.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(newData));
      return newData;
    });
  };

  const changeTotalPrice = () => {
    const tolal = cartItems.reduce(
      (acc, cur) => acc + cur.price * cur.count,
      0
    );
    setTotalPrice(tolal);
  };

    useEffect(changeTotalPrice, [cartItems]);
    
  return (
    <>
      {cartItems.length === 0 ? (
        <section className={styles.cart_empty}>
          <TbShoppingCartX />
          <p>Your shopping cart is currently empty.</p>
          <span>
            Before proceeding to checkout, you need to add some products to your
            cart.
          </span>
          <span>
            You will find many interesting products on the "Shop" page.
          </span>
          <div>
            <Link href="/">Back to Shop</Link>
          </div>
        </section>
      ) : (
        <div>
          <div className={styles.cart_container}>
            <div>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr className={styles.tr}>
                    <th className={styles.th} colSpan={2}>
                      Product
                    </th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Total</th>
                    <th className={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      handelChangequantity={handelChangequantity}
                      handelDeleteItem={handelDeleteItem}
                    />
                  ))}
                </tbody>
              </table>
              <div className={styles.coupon_container}>
                <div className={styles.coupon_input}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your coupon code"
                  />
                  <button className={styles.coupon_button}>Apply </button>
                </div>
                <button className={styles.update_button}>Update cart</button>
              </div>
            </div>
            <div className={styles.address}>
              <h3>Shipping Address</h3>

              <div className={styles.form_group}>
                <label htmlFor="address">Province:</label>
                <Select
                  defaultValue={selectedProvince}
                  onChange={(option) => {
                    setSelectedProvince(option);
                    setSelectedCity(null);
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "5px",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      fontSize: "14px",
                      fontStyle: "italic",
                    }),
                  }}
                  options={provinceOptions}
                  placeholder="Select a province"
                  isSearchable={true}
                  isClearable={true}
                  className={styles.select}
                  classNamePrefix="select"
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  name="address"
                  id="address"
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="city">City:</label>
                <Select
                  value={selectedCity}
                  onChange={setSelectedCity}
                  options={selectedProvince?.provinces}
                  placeholder="Select a city"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "5px",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      fontSize: "14px",
                      fontStyle: "italic",
                    }),
                  }}
                  isDisabled={!selectedProvince}
                  isClearable={true}
                  isSearchable={true}
                  className={styles.select}
                  classNamePrefix="select"
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  name="city"
                  id="city"
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="street">Street Address:</label>
                <input
                  type="text"
                  placeholder="Street address (e.g. Calle Mayor, 10)"
                  className={styles.input}
                  name="street"
                  id="street"
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="postal">Postal Code:</label>
                <input
                  type="text"
                  placeholder="Postal code (e.g. 28013)"
                  className={styles.input}
                  name="postal"
                  id="postal"
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="floor">Floor / Apartment:</label>
                <input
                  type="text"
                  placeholder="Floor / Apartment (optional)"
                  className={styles.input}
                  name="floor"
                  id="floor"
                />
              </div>
              <div className={styles.total_price}>
                <p>Total Price:</p>
                <p>{totalPrice.toLocaleString("en-US")}</p>
              </div>
              <button
                onClick={() => setChangeAddress(false)}
                className={styles.address_button}
              >
                Update Address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
