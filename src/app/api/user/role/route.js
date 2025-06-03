import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id } = body;
    await connectToDB();
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { role: user.role === "ADMIN" ? "USER" : "ADMIN" } },
      { new: true }
    );

    return Response.json(
      { message: "User role updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
