import { authUser } from "@/utils/serverHelper";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const {
      department,
      subDepartment,
      body,
      priority,
      title,
      answer,
      hasAnswer,
      adminId,
    } = reqBody;

    if (
      department.trim() === "" ||
      subDepartment.trim() === "" ||
      body.trim() === "" ||
      title.trim() === ""
    )
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    const user = await authUser();
    await connectToDB();
    const ticket = await TicketModel.create({
      department,
      subDepartment,
      body,
      priority,
      title,
      user: user._id,
      answer,
      hasAnswer,
      adminId,
    });
    return Response.json(
      { data: ticket },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
