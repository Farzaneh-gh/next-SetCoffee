import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import mongoose from "mongoose";
export async function GET(req,{ params }) {
  // ✅ params is the second argument

  const productId = await params.id;
  

  try {
    await connectToDB();
    const productData = await productModel
      .findOne({ _id: productId })
      .populate("comments");

    if (!productData) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json({ data: productData }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }
    await connectToDB();
    const product = await productModel.deleteOne({ _id: id });
    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}