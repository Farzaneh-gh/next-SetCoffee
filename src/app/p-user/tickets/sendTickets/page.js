import React from "react";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import SendTickets from "@/components/templates/p-user/tickets/SendTickets";

const page = () => {
  return (
    <UserPanelLayout>
      <SendTickets />
    </UserPanelLayout>
  );
};

export default page;
