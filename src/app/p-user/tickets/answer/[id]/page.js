import React from "react";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import Answer from "@/components/templates/p-user/tickets/Answer";
import styles from "@/styles/p-user/answer.module.css";
import Link from "next/link";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
const page = async ({ params }) => {
  const ticketId = params.id;
  await connectToDB();
  const ticket = await TicketModel.findById(ticketId)
    .populate("department")
    .populate("user", "name role")
    .populate("adminId", "name role");
  return (
    <UserPanelLayout>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Answer title</h1>
          <Link href={`/p-user/tickets/sendTickets`}>Send Ticket</Link>
        </div>
        <section>
          {ticket && <Answer role="USER" name={ticket.user.name} body={ticket.body} date={ticket.createdAt}/>}
          {ticket.hasAnswer ? (
            <Answer role="ADMIN" body={ticket.answer} date={ticket.updatedAt} name={ticket.adminId.name}/>
          ) : (
            <div className={styles.empty}>
              <p>No Answer yet.....</p>
            </div>
          )}
        </section>
      </main>
    </UserPanelLayout>
  );
};

export default page;
