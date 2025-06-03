import mongoose from "mongoose";
import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { authUser } from "@/utils/serverHelper";
export async function PUT(req) {
  try {
    const { id } = await req.json();
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return Response.json({ message: "User is not valid" }, { status: 400 });
    }
    await connectToDB();
     const targetUser = await userModel.findById(id);
     if (!targetUser) {
       return Response.json({ message: "User not found" }, { status: 404 });
     }
    const user = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { isBanned: !targetUser.isBanned } },
      { new: true }
    );

    return Response.json(
      { message: "User banned successfully"},
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
