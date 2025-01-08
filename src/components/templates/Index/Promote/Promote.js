import React from "react";
import styles from "./Promote.module.css";
import Image from "next/image";
import Link from "next/link";
function Promote() {
  return (
    <div className={styles.promot_container}>
      <main className="container" data-aos="fade-up-right">
        <section className={styles.rows}>
          <div className={styles.firstItem}>
            <Image
              src="/images/clubset.jpg"
              alt="Promote"
              width={660}
              height={530}
              style={{ width: "100%", height: "100%" }}
            />
            <div className={styles.club}>
              {" "}
              <span>Set Customer Club</span>
              <p>For loyal customers of Set Coffee</p>
            </div>
          </div>
          <div className={styles.secondItem}>
            <span>Buy Coffee, Like the Pros</span>
            <p>Make today beautiful with Set Coffee</p>
            <img
              className={styles.coffee_image}
              src="/images/coffee-image-1.jpg"
              alt="Promote"
              data-aos="fade-left"
            />
          </div>
        </section>
        <section className={styles.rows}>
          <div className={styles.secondItem}>
            <img
              className={styles.logo}
              src="/images/coffee-svg-2.svg"
              alt=""
            />
            <p className={styles.title}>Why Set Coffee?</p>
            <p>
              With extensive experience, a rich heritage, and an understanding
              of consumer preferences, we are guided in meeting the needs of
              specialty coffee (Third Wave) enthusiasts. Four generations of
              expertise and continuous engagement with coffee consumers
              guarantee these qualities.
            </p>
            <div>
              <Link href="/about-us">
                <button className={styles.red_btn}>Read More</button>
              </Link>
              <Link href="/category">
                <button className={styles.white_btn}>Store</button>
              </Link>
            </div>
          </div>
          <div className={styles.firstItem}>
            <img
              data-aos="fade-up"
              src="/images/Home32 copy.jpg"
              alt="Promote"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Promote;
