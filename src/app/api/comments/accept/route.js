import connectToDB from "@/configs/db";
import mongoose from "mongoose";
import CommentModel from "@/models/Comment";
import { authAdmin } from "@/utils/serverHelper";
export async function PUT(req) {

  const isAdmin=await authAdmin();
  if(!isAdmin) return Response.json({error:"Unauthorized"}, { status: 401 });
  
  const { id } = await req.json();
  const isValidID = mongoose.Types.ObjectId.isValid(id);
  if (!isValidID) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  try {
    await connectToDB();
    const comment = await CommentModel.findOneAndUpdate(
      { _id: id },
      { $set: { isAccept: true, isPending: false } },
      { new: true }
    );
    if (!comment) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json(
      { message: "Comment accepted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
