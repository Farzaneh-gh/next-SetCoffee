import React from 'react'
import styles from "@/styles/not-Found.module.css"
import Link from 'next/link'
const NotFound = () => {
  return (
    <>
        <div className={styles.content}>
            <p className={styles.number_left}>4</p>
            <div className={styles.mug}></div>
            <p className={styles.number_right}>4</p>
        </div>
        <div className={styles.texts}>
            <p>Page Not Found</p>
            <Link href="/">Back to Home</Link>
        </div>
    </>
  )
}
export default NotFound