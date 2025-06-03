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

    const { name, phone, email } = body;
    if (!name.trim()) {
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


  const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    return Response.json({ message: "Code sent successfully" }, { status: 201 });
    } catch (error) {
        console.error("Twilio Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
      
 
}
