import connectToDB from "@/configs/db";
import { generateAccessToken, generateRefreshAccessToken } from "@/utils/auth";
import userModel from "@/models/User";


const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
export async function POST(request) {
  const { phone, code } = await request.json();
  if (!phone || !code) {
    return Response.json(
      { error: "Phone number and code are required" },
      { status: 400 }
    );
  }
  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code: code });

    if (verificationCheck.status === "approved") {
      await connectToDB();
      const user = await userModel.findOne({ phone });

      const token = generateAccessToken({ email: user.email });
      const refreshToken = generateRefreshAccessToken({ email: user.email });
       await userModel.findOneAndUpdate(
         { email: user.email },
         {
           $set: { refreshToken },
         }
       );

      return Response.json(
        { message: "Code verified successfully" },
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${token};path=/;httpOnly=true`,
          },
        }
      );
    } else {
      return Response.json({ error: "Invalid code" }, { status: 400 });
    }
  } catch (error) {
    console.error("Twilio Error:", error);
    return Response.json({ error: "Failed to verify code" }, { status: 500 });
  }
}
