import React from 'react'
import styles from './BreadCrumb.module.css'
import Link from 'next/link';

 async  function BreadCrumb({ route }) {
console.log(route)
   return (
     <div className={styles.breadcrumb}>
       <div className={styles.breadcrumb_route}>
         <p className={styles.title}>{route}</p>
         <div className={styles.subtitle}>
           <Link href="/">Home</Link>
           <span> / {route}</span>
         </div>
       </div>
     </div>
   );
 }

export default BreadCrumb