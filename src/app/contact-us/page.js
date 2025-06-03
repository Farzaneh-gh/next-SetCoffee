
"use client"
import React from 'react'
import styles from '@/styles/contact-us.module.css'
import Navbar from '@/components/modules/Navbar/Navbar'
import Footer from '@/components/modules/Footer/Footer'
import BreadCrumb from '@/components/modules/Breadcrumb/BreadCrumb'
import Information from '@/components/templates/contact-us/Information'
import Form from '@/components/templates/contact-us/Form'
import Map from '@/components/templates/contact-us/Map'
import Link from 'next/link'
const page = () => {


  return (
    <div>
      <Navbar />
      <BreadCrumb route="Contact Us" />

      <div className={styles.map_container}>
        <Map position={[41.3851, 2.1734]} center={[41.3851, 2.1734]}>
          <span> Our Store </span>
          <h3>Physical Store Address (Barcelona Branch)</h3>
          <p>
            Barcelona – Carrer de Balmes – Carrer de Pau Claris – Near Passeig
            de Gràcia – No. 10
          </p>
          <p>+34 931 234 567</p>
          <Link href="/about-us">About the Store</Link>
        </Map>
        <Map position={[40.4168, -3.7038]} center={[40.4168, -3.7038]}>
          <span> Our Store </span>
          <h3>Physical Store Address (Madrid Branch)</h3>
          <p>
            Madrid – Gran Vía – Calle de Preciados – Near Puerta del Sol – No.
            25
          </p>
          <p>+34 910 765 432</p>
          <Link href="/about-us">About the Store</Link>
        </Map>
      </div>

      <div className={styles.container}>
        <Information />
        <Form />
      </div>
      <Footer />
    </div>
  );
}

export default page