import Link from 'next/link'
import React from 'react'
import styles from "./Breadcrumb.module.css"
function Breadcrumb({route}) {
  return (
    <section className={styles.product_breadcrumb}>
        <Link href="/">Home</Link>
        <span> / </span>
        <Link href="/">All Products</Link>
        <span> / </span>
        <span> {route}</span> 
    </section>
  )
}

export default Breadcrumb