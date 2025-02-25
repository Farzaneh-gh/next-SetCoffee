import connectToDB from "@/configs/db";
import { validateEmail, validatePassword } from "@/validators/auth";
import userModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshAccessToken,
  verifyPassword,
} from "@/utils/auth";
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    if (!isValidPassword || !isValidEmail) {
      return Response.json(
        { message: "Email or Password is not valid" },
        {
          status: 419,
        }
      );
    }
    await connectToDB();
    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "User not found" }, { starus: 422 });
    }
    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      return Response.json(
        {
          message: "Email or password is not correct",
        },
        { status: 401 }
      );
    }
    const token = generateAccessToken({ email });
    const refreshToken = generateRefreshAccessToken({ email });
    await userModel.findOneAndUpdate(
      { email },
      {
        $set: { refreshToken },
      }
    );
    return Response.json(
      { message: "User logged in successfully :))" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token};path=/;httpOnly=true`,
        },
      }
    );
  } catch (err) {
    console.log("Err-->", err);
    return Response.json({ message: err }, { status: 500 });
  }
}
