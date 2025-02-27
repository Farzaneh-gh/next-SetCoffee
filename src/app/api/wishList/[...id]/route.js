import connectToDB from "@/configs/db";
import wishListModel from "@/models/WishList";
export async function GET(req, { params }) {
  const data =( await params).id;

  const [userId, productId] = data;
  try {
    await connectToDB();
    const wishList = await wishListModel.findOne({
      user: userId,
      product: productId,
    });
  
    if (!wishList)
      return Response.json(
        { message: "Product not found in wishlist" },
        { status: 404 }
      );
    return Response.json({ data: wishList }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
