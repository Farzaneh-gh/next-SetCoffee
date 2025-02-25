import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { Roles } from "@/utils/constant";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/validators/auth";

export async function POST(req) {
  const body = await req.json();

  const { name, phone, email, password } = body;
  if (!name.trim()) {
    return Response.json(
      { message: "User name is not valid" },
      { status: 204 }
    );
  }
  if (email) {
    const verifyEmail = validateEmail(email);
    if (!verifyEmail) {
      return Response.json({ message: "Email is not valid" }, { status: 204 });
    }
  }
  const verifyPhon = validatePhone(phone);
  if (!verifyPhon) {
    return Response.json(
      { message: "Phone number is not valid" },
      { status: 204 }
    );
  }

  const verifyPassword = validatePassword(password);
  if (!verifyPassword) {
    return Response.json({ message: "Password is not valid" }, { status: 204 });
  }

  await connectToDB();
  const isUserExist = await userModel.findOne({
    $or: [{ name }, { email }, { phone }],
  });
  if (isUserExist) {
    return Response.json(
      { message: "Phone or Name or Email is exist already" },
      { status: 422 }
    );
  }
  console.log(password);
  const hashedPassword = await hashPassword(password);
  const userRole = await userModel.find({});
  const user = userModel.create({
    name,
    phone,
    email,
    password: hashedPassword,
    role: userRole.length > 0 ? Roles.USER : Roles.ADMIN,
  });
  const token = generateAccessToken({ name });

  return Response.json(
    { message: "User created successfully" },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
    }
  );
}
