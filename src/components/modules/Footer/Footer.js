import React from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'
import { MdOutlineCopyright } from "react-icons/md";
import Article from './Article';
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa";
function Footer() {
  return (
    <footer className={styles.footer}>
      <main className="container">
        <section className={styles.descriptions}>
          <Link href="/" className={styles.link}>
            <img
              src="/images/logo_light.png"
              alt="Logo"
              width={150}
              height={50}
            />
          </Link>
          <p className={styles.descriptions_title}>
            {" "}
            Kharazmi Hot Cup Company, Set Coffee Online Store
          </p>
          <div className={styles.description}>
            <FaTelegramPlane />

            <p>
              Tehran, Sharif Abad, Kharazmi Industrial Town, Phase 2, Baharestan
              Boulevard, Magnolia Street, Block A117
            </p>
          </div>
          <div className={styles.description}>
            <IoIosPhonePortrait />
            <p>Order Tracking: 02188305827</p>
          </div>
          <div className={styles.description}>
            <FaRegEnvelope />
            <p>support [at] set-coffee.com</p>
          </div>
        </section>
        <section className={styles.descriptions}>
          <p className={styles.Articles_title}>Latest Articles</p>
          <Article
            href={"/article/123"}
            date="November 8, 2023"
            comments="No Comments"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="Boost Energy with Instant Coffee Powder"
          />
          <hr />
          <Article
            href={"/article/123"}
            date="November 8, 2023"
            comments="No Comments"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="Boost Energy with Instant Coffee Powder"
          />
          <hr />
          <Article
            href={"/article/123"}
            date="November 8, 2023"
            comments="No Comments"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="Boost Energy with Instant Coffee Powder"
          />
        </section>
        <ul className={styles.links}>
          <div>
            <h4>Footer Menu</h4>
            <li>
              <Link href={"/contact-us"}>Contact Us</Link>
            </li>
            <li>
              <Link href={"/about-us"}>About Us</Link>
            </li>
            <li>
              <Link href={"/rules"}>Rules</Link>
            </li>
          </div>
          <div>
            <h4>Quick Access</h4>
            <li>
              <Link href={"/category"}>Store</Link>
            </li>
            <li>
              <Link href={"/articles"}>Articles</Link>
            </li>
            <li>
              <Link href={"/cart"}>Shopping Cart</Link>
            </li>
            <li>
              <Link href={"/wishlist"}>Favorites</Link>
            </li>
          </div>
        </ul>

        <section className={styles.licenses}>
          <img src="/images/license4.htm" width={76} height={76} alt="" />
          <img src="/images/license1.png" width={85} height={85} alt="" />
          <img src="/images/license3.png" alt="" />
          <img src="/images/license2.svg" width={62} height={95} alt="" />
        </section>
      </main>
      <hr />
      <div className={`container ${styles.copyRight_container}`}>
        <p className={styles.copyRight}>
          2023 <MdOutlineCopyright /> All rights reserved to{" "}
          <strong>Set Coffee</strong> | Designed and executed by{" "}
          <strong>NilaMarketing</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer