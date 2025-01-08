import React from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
import Image from 'next/image'
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <main>
        <div className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={50}
            quality={100}
          />
        </div>
        <ul className={styles.links}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/catalog">Store</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
          <li>
            <Link href="/rules">Rules</Link>
          </li>
          <li>
            <div className={styles.dropdown}>
              <div className={styles.dropdown_button}>
                <Link href="/login">User Account</Link>
                <IoIosArrowDown className={styles.dropdown_icon} />
              </div>
              <div className={styles.dropdown_content}>
                <Link href="/p-user/orders">Orders</Link>
                <Link href="/p-user/tikets">tikets</Link>
                <Link href="/p-user/comments">Comments</Link>
                <Link href="/p-user/wishlist">Wishlist</Link>
                <Link href="/p-user/account-details">Account Details</Link>
              </div>
            </div>
          </li>
        </ul>

        <div className={styles.navbar_icons}>
          <Link href="/card">
            <HiMiniShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
            <span>2</span>
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar