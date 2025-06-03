"use client";
import { showSwal } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishlist({ product }) {
  const [user, setUser] = useState(null);
  const [added, setAdded] = useState(false);


  useEffect(() => {
    const isUserLoggedIn = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();

        setUser(data);
      }
    };
    isUserLoggedIn();
  }, []);


  useEffect(() => {
    if (!user || !product) return;
    const isAddedInWishlist = async () => {
      const res = await fetch(`/api/wishList/${product}`);
      if (res.status === 200) {
        setAdded(true);
      }
      if (res.status === 404) {
        setAdded(false);
      }
    };
    isAddedInWishlist();
  }, [user, product]);

  const handelAddToWishlist = async (e) => {
    e.preventDefault();
    if (!user) {
      showSwal("Login to add to wishlist", "error", "ok");
      return;
    }
    if (added) {
      showSwal("Product already added to wishlist", "error", "ok");
      return;
    }
    const data = { user: user._id, product };
    const res = await fetch("/api/wishList", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
 

    if (res.status === 201) {
      setAdded(true);
      showSwal("Product added to wishlist", "success", "ok");
      return;
    }
    if (res.status === 409) {
      showSwal("Product already added to wishlist", "error", "ok");
      return;
    }
    if (res.status !== 201 && res.status !== 409) {
      showSwal("Something went wrong", "error", "ok");
      return;
    }
  };

  return (
    <div onClick={handelAddToWishlist}>
      <CiHeart style={{ color: added ? "red" : "" }} />
      <span> Add to Wishlist</span>
    </div>
  );
}

export default AddToWishlist;
