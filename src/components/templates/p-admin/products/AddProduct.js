"use client";
import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";


const AddProduct = () => {
  const Router = useRouter();
  const [img, setImg] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [tags, setTags] = useState("");

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("weight", weight);
    formData.append("suitableFor", suitableFor);
    formData.append("smell", smell);
    formData.append("tags", tags.split(","));
    console.log(formData);

    try {
      const response = await fetch("/api/products", {
        method: "POST",

        body: formData,
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      if (response.status === 201) {
        swal({
          title: "Product created successfully",
          icon: "success",
          buttons: "ok",
        }).then(() => {
          setName("");
          setPrice("");
          setShortDescription("");
          setLongDescription("");
          setWeight("");
          setSuitableFor("");
          setSmell("");
          setTags("");
          setImg({});
          return Router.refresh();
        });
      }
    } catch (err) {
      return swal({
        title: "Something went wrong please try again",
        icon: "error",
        buttons: "ok",
      });
    }
  };
  return (
    <section className={styles.discount}>
      <p>Add New Product</p>
      <div className={styles.discount_main}>
        <div>
          <label>Product Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Please enter the product name"
            type="text"
          />
        </div>
        <div>
          <label>Product Price</label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Please enter the product price"
            type="text"
          />
        </div>

        <div>
          <label>Short Description</label>
          <input
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            placeholder="Short product description"
            type="text"
          />
        </div>
        <div>
          <label>Long Description</label>
          <input
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
            placeholder="Long product description"
            type="text"
          />
        </div>
        <div>
          <label>Weight</label>
          <input
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="Product weight"
            type="text"
          />
        </div>
        <div>
          <label>Suitable For:</label>
          <input
            value={suitableFor}
            onChange={(event) => setSuitableFor(event.target.value)}
            placeholder="Suitable for..."
            type="text"
          />
        </div>
        <div>
          <label>Smell Intensity</label>
          <input
            value={smell}
            onChange={(event) => setSmell(event.target.value)}
            placeholder="Smell intensity"
            type="text"
          />
        </div>
        <div>
          <label>Product Tags</label>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Example: coffee, Turkish coffee, espresso"
            type="text"
          />
        </div>
        <div>
          <label>Product Image</label>
          <input
            onChange={(event) => setImg(event.target.files[0])}
            type="file"
          />
        </div>
      </div>
      <button onClick={addProduct}>Add</button>
  
    </section>
  );
};

export default AddProduct;
