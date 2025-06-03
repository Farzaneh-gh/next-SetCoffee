import connectToDB from "@/configs/db";
import wishListModel from "@/models/WishList";
import { authUser } from "@/utils/serverHelper";
export async function GET(req, { params }) {
  const productId= (await params).id;

  try {
    const user=authUser();
    if(!user) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const userId=user._id;
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

export async function DELETE(req, { params }) {
  const productId= (await params).id;

  try {
    const user=await authUser();
    if(!user) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const userId=user._id;
    await connectToDB();
    const product = await wishListModel.findOneAndDelete({
      user: userId,
      product: productId,
    });
    if (!product)
      return Response.json(
        { message: "Product not found in wishlist" },
        { status: 404 }
      );
    return Response.json({ message: "Resource deleted successfully" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
