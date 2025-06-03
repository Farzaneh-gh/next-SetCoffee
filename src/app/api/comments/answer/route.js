import { authUser } from "@/utils/serverHelper";
import mongoose from "mongoose";
import CommentModel from "@/models/Comment";
import { authAdmin } from "@/utils/serverHelper";
import connectToDB from "@/configs/db";
export async function PUT(req) {
  const isAdmin = await authAdmin();
  if (!isAdmin)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectToDB();
    const { id, answer } = await req.json();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid id" }, { status: 400 });
    }

    const user = await authUser();
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const comment = await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          answer,
          answerAdminId: user._id,
          hasAnswered: true,
          answerDate: new Date(),
        },
      },
      { new: true }
    );

    if (!comment) {
      return Response.json({ message: "Comment not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Answer added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
