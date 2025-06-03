import React from 'react'
import Navbar from '@/components/modules/Navbar/Navbar' 
import BreadCrumb from '@/components/modules/Breadcrumb/BreadCrumb'
import Footer from '@/components/modules/Footer/Footer'
import { authUser } from "@/utils/serverHelper";
import styles from "@/styles/rules.module.css";
const page = () => {
    const user=authUser();
  return (
    <div>
      <Navbar isLogged={user} />
      <BreadCrumb route="Rules" />

    <div className={styles.container}>
      <h1 className={styles.heading}>Privacy Policy & Terms of Service</h1>
      
      <p className={styles.text}>
        At <strong>Coffee Set</strong>, we are committed to protecting your privacy and ensuring compliance with the 
        <strong> General Data Protection Regulation (GDPR)</strong> and European e-commerce laws.
      </p>

      <h2 className={styles.subheading}>1. Collection & Use of Personal Data</h2>
      <p className={styles.text}>When you shop with us, we may request personal information, including:</p>
      <ul className={styles.list}>
        <li>Full name</li>
        <li>Billing & shipping address</li>
        <li>Phone number</li>
        <li>Email address</li>
        <li>Payment details (securely processed via third-party providers)</li>
      </ul>

      <h2 className={styles.subheading}>2. Your Rights Under GDPR</h2>
      <p className={styles.text}>As an EU resident, you have the right to:</p>
      <ul className={styles.list}>
        <li><strong>Access</strong> – Request a copy of your personal data.</li>
        <li><strong>Erasure</strong> – Request deletion of data.</li>
        <li><strong>Withdraw Consent</strong> – Opt-out of marketing at any time.</li>
      </ul>

      <h2 className={styles.subheading}>3. Contact Information</h2>
      <p className={styles.text}>For any questions, feel free to contact us:</p>
      <p className={styles.contact}><strong>📞 Phone:</strong> +44 20 1234 5678</p>
      <p className={styles.contact}><strong>📧 Email:</strong> support@coffeeset.com</p>

      <p className={styles.footer}>
        We are committed to providing a <strong>safe, transparent, and enjoyable shopping experience</strong>. ☕✨
      </p>
    </div>
 
      <Footer />
    </div>
  );
}

export default page