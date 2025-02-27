import React from 'react'
import styles from '@/styles/contact-us.module.css'
import Navbar from '@/components/modules/Navbar/Navbar'
import Footer from '@/components/modules/Footer/Footer'
import BreadCrumb from '@/components/modules/Breadcrumb/BreadCrumb'
import Information from '@/components/templates/contact-us/Information'
import Form from '@/components/templates/contact-us/Form'
const page = () => {
  return (
    <div>
      <Navbar />  
      <BreadCrumb route="Contact Us" />
      <div className={styles.container}>
        <Information />
        <Form />
      </div>
      <Footer />
    </div>
  )
}

export default page