import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelper";
import mongoose from "mongoose";
export async function PUT(req) {
  try {
    const { answer, ticketId } = await req.json();
    console.log(answer, ticketId);
    if ( !answer || !ticketId)
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    if (!mongoose.Types.ObjectId.isValid(ticketId))
      return Response.json({ message: "Ticket is not valid" }, { status: 400 });
    await connectToDB();
    const admin = await authUser();
    if (!admin) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const ticket = await TicketModel.findOneAndUpdate(
      { _id: ticketId },
      { $set: { adminId: admin._id, answer, hasAnswer: true } },
      { new: true }
    );

    if (!ticket) {
      return new Response.json(
        { message: "Ticket not found" },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      { message: "Answer sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
