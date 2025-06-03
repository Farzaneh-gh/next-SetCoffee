
"use client";
import React, { useState } from "react";
import styles from "./Tickets.module.css";
import Link from "next/link";
import Ticket from "./Ticket";

const Tickets = ({ tickets=[] }) => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Tickets </h1>

        <Link href="/p-user/tickets/sendTickets">Send Ticket</Link>
      </div>
      <main>
        <section className={styles.header}>
          <div className={styles.filters}>
            <select>
              <option>All</option>
              <option>Sent</option>
              <option>Received</option>
            </select>
            <select>
              <option>All</option>
              <option>Open</option>
              <option>Closed</option>
              <option>Replied</option>
              <option>Completed</option>
            </select>
            <select>
              <option>Response Date</option>
              <option>Creation Date</option>
            </select>
          </div>
          <button type="submit">Filter</button>
        </section>
        <section className={styles.tickets}>
          {tickets &&
            tickets.map((ticket) => (
              <Ticket
                key={ticket._id}
                department={ticket.department.title}
                subDepartment={ticket.subDepartment?.title}
                title={ticket.title}
                date={ticket.createdAt}
                body={ticket.body}
                isAnswered={ticket.hasAnswer}
                ticketId={ticket._id} 
              />
            ))}
          {tickets.length === 0 && (
            <p className={styles.no_tickets}>No tickets found</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Tickets;
