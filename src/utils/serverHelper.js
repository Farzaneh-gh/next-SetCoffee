

import { cookies } from "next/headers";
import userModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyAccessToken } from "./auth";

const authUser = async () => {
  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token) {
    return false;
  }
  const tokenPayload = verifyAccessToken(token.value);
  if (!tokenPayload) {
    return false;
  }
  await connectToDB();
  const userData = await userModel.findOne({ email: tokenPayload.email });
  if (!userData) {
    return false;
  }
  return JSON.parse(JSON.stringify(userData));
};


const authAdmin = async () => {
  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token) return false;

  const tokenPayload = verifyAccessToken(token.value);
  if (!tokenPayload) return false;

  await connectToDB();
  const user = await userModel.findOne({ email: tokenPayload.email });
  if (!user) return false;

  if(user.role !== "ADMIN") return false;

  return JSON.parse(JSON.stringify(user));
};
export{ authUser,authAdmin };