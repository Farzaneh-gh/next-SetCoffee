import { authUser } from "@/utils/serverHelper";
import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import mongoose from "mongoose";
export async function PUT(req) {
  await connectToDB();
  const body = await req.json();
  const { name, email, phone } = body;

  try {
    const user = await authUser();
    if (!user)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    await userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, email, phone } }
    );
    return Response.json(
      { message: "User updated successfully" },
   
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try{
   
    const {id}=await req.json();
    const isValidId=mongoose.Types.ObjectId.isValid(id);
    if(!isValidId){
      return Response.json({message:"User is not valid"},{status:400});
    }
     await connectToDB();
    const user=await userModel.findOneAndUpdate({_id:id},{$set:{isDeleted:true}});
    return Response.json({message:"User deleted successfully"},{status:200});

  }catch(err){
    return Response.json({message:err.message},{status:500});
  }
}