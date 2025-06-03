import connectToDB from "@/configs/db";
import userModel from "@/models/User";

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
export async function POST(request) {
  const { phone } = await request.json();

  if (!phone) {
    return Response.json(
      { error: "Phone number is required" },
      { status: 400 }
    );
  }
  try {
    await connectToDB();
    const user=await userModel.findOne({phone});
    if(!user){
      return Response.json({error:"User not found"}, {status: 404});
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