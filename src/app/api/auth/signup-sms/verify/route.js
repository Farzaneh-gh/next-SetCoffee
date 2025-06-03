import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { generateAccessToken, generateRefreshAccessToken } from "@/utils/auth";
import { Roles } from "@/utils/constant";
import { validateEmail, validatePhone } from "@/validators/auth";
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, phone, email, code } = body;
    if (!name.trim() || !code.trim()) {
      return Response.json(
        { message: "User name is not valid" },
        { status: 400 }
      );
    }
    if (email) {
      const verifyEmail = validateEmail(email);
      if (!verifyEmail) {
        return Response.json(
          { message: "Email is not valid" },
          { status: 204 }
        );
      }
    }
    const verifyPhon = validatePhone(phone);
    if (!verifyPhon) {
      return Response.json(
        { message: "Phone number is not valid" },
        { status: 204 }
      );
    }

    await connectToDB();
    const isUserExist = await userModel.findOne({
      $or: [{ name }, { email }, { phone }],
    });
    if (isUserExist) {
      return Response.json(
        { message: "Phone or Name or Email is exist already" },
        { status: 409 }
      );
    }

    const userRole = await userModel.find({});

    const token = generateAccessToken({ name });

    const refreshToken = generateRefreshAccessToken({ name });

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code: code });

    if (verificationCheck.status === "approved") {
      const user = await userModel.create({
        name,
        phone,
        email,
        role: userRole.length > 0 ? Roles.USER : Roles.ADMIN,
        refreshToken,
      });

      return Response.json(
        { message: "Code verified successfully" },
        {
          status: 201,
          headers: {
            "Set-Cookie": `token=${token};path=/;httpOnly=true`,
          },
        }
      );
    } else {
      return Response.json({ message: "Code is not valid" }, { status: 409 });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
