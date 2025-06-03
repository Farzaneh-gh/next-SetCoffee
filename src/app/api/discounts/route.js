import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelper";
import DiscountModel from "@/models/Discount";
import mongoose from "mongoose";
export async function POST(req) {
  try {
    const body = await req.json();
    const { code, discount, maxUsePerUser, product } = body;
    console.log(body);
    if (!code || !discount || !maxUsePerUser || !product) {
      return new Response.json(
        { message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    const user = await authUser();
    if (!user)
      return new Response.json(
        { message: "Unauthorized" },
        {
          status: 401,
        }
      );

    await connectToDB();

    const discountCode = await DiscountModel.create({
      code,
      discount,
      maxUsePerUser,
      product,
      createdBy: user._id,
      DateCreated: new Date(),
    });
    return Response.json(
      { message: "Discount created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  try {
    const { id } = await req.json();
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return Response.json(
        { message: "Discount is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const discount = await DiscountModel.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } }
    );
    return Response.json(
      { message: "Discount deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
