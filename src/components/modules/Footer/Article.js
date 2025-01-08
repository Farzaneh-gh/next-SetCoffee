import React from 'react'
import styles from './Article.module.css'
import Link from 'next/link';
function Article({ title, img, comments, date, href }) {
  return (
    <Link href={href} className={styles.article}>
      <img width={75} height={65} src={img} alt="" />
      <div>
        <p className={styles.title}>{title}</p>
        <div>
          <p>{comments},</p>
          <p dir="rtl">{date}</p>
        </div>
      </div>
    </Link>
  );
}

export default Article