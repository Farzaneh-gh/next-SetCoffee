import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

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