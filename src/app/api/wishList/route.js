import connectToDB from "@/configs/db";
import WishListModel from "@/models/WishList";
const mongoose = require("mongoose");
import userModel from "@/models/User";
import productModel from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const { product, user } = body;

    if (!product || !user)
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );

    const isValidUserId = mongoose.Types.ObjectId.isValid(user);
    if (!isValidUserId) {
      return Response.json({ message: "User is not valid" }, { status: 400 });
    }
    const isValidProductId = mongoose.Types.ObjectId.isValid(product);
    if (!isValidProductId) {
      return Response.json(
        { message: "Product is not valid" },
        { status: 400 }
      );
    }

    const isValidUser = await userModel.findOne({ _id: user });
    if (!isValidUser)
      return Response.json({ message: "User not found" }, { status: 404 });

    const isValidProduct = await productModel.findOne({ _id: product });
    if (!isValidProduct)
      return Response.json({ message: "Product not found" }, { status: 404 });

    const isProductInWishList = await WishListModel.findOne({ product, user });
    if (isProductInWishList) {
      return Response.json(
        { message: "Product already in wishList" },
        { status: 409 }
      );
    }
    const wishList = await WishListModel.create({ product, user });
    return Response.json(
      { message: "WishList created successfully", data: wishList },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
