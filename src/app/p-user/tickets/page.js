import React from "react";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import { authUser } from "@/utils/serverHelper";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
const page = async () => {
  await connectToDB();
  const user = await authUser();
console.log(user);
  const tickets = await TicketModel.find({ user: user._id }, "-__v").populate(
    "department subDepartment"
  ).sort({ createdAt: -1 });
  console.log(tickets);
  return (
    <UserPanelLayout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </UserPanelLayout>
  );
};

export default page;
