import { cookies } from "next/headers";
import userModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
export async function GET(req) {

  try {
     const cookie = await cookies();
     const token = cookie.get("token");

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tokenPayload = verifyAccessToken(token.value);
  
    if (!tokenPayload) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectToDB();
    const user = await userModel.findOne({ email: tokenPayload.email });

    if (!user) {
           
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
