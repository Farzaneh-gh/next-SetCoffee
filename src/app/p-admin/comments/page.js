import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import styles from '@/styles/p-admin/comments.module.css'
import Table from '@/components/templates/p-admin/comments/Table'
import CommentModel from '@/models/Comment'
import connectToDB from '@/configs/db'
const page = async() => {
    await connectToDB();
    const comments = await CommentModel.find( {isDeleted: { $exists: false } })
      .populate("productId")
      .populate("userId")
      .lean()
      .sort({ _id: -1 })
      .limit(10);
  return (
    <AdminPanelLayout>
      <div className={styles.conatiner}>
        <div className={styles.title}>
          <h1>Comments List</h1>
        </div>
        <div className={styles.table_container}>
         <Table comments={JSON.parse(JSON.stringify(comments))}/>
        </div>
      </div>
    </AdminPanelLayout>
  );
}

export default page