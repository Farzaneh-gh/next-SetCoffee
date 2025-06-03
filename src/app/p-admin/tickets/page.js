import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import styles from '@/styles/p-admin/tickets.module.css'
import connectToDB from '@/configs/db'
import TicketModel from '@/models/Ticket'
import Table from '@/components/templates/p-admin/tikets/Table'
const page = async() => {
    await connectToDB();
    const tikets=await TicketModel.find({}).populate("department", "title").populate("user").sort({createdAt:-1});
  return (
    <AdminPanelLayout>
      <div className={styles.conatiner}>
        <div className={styles.title}>
          <h1>Tickets List</h1>
        </div>
        <div className={styles.table_container}>
         <Table tikets={JSON.parse(JSON.stringify(tikets))} />
        </div>
      </div>
    </AdminPanelLayout>
  );
}

export default page