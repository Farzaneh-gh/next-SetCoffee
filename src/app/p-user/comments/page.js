import React from 'react'
import styles from "@/styles/p-user/comments.module.css"
import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import DataTable from '@/components/templates/p-user/comments/DataTable'
import { authUser } from '@/utils/serverHelper'
import connectToDB from '@/configs/db'
import commentModel from '@/models/Comment'
const page =async () => {
    const user = await authUser();
    await connectToDB();
    const commentsData = await commentModel.find({ userId: user._id }).populate("productId", "name");
    const comments = JSON.parse(JSON.stringify(commentsData));
  return (
    <UserPanelLayout>
         <main className={styles.container}>
        <div className={styles.title}>
          <p>Comments</p>
        </div>
        <DataTable comments={comments}/>
        </main>
        </UserPanelLayout>
  )
}

export default page