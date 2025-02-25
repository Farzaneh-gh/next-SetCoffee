import Footer from '@/components/modules/Footer/Footer';
import React from 'react'
import styles from '@/styles/about-us.module.css'
import Navbar from '@/components/modules/Navbar/Navbar';
import BreadCrumb from '@/components/modules/Breadcrumb/BreadCrumb';
import { authUser } from "@/utils/auth";
 const page = async() => {
    const user=await authUser();
  return (
    <>
   <Navbar isLogged={user}/> 
      <BreadCrumb route="About Us"/>
      <div className={styles.container}>
        <section>
          <div>
            <span>About Us</span>
            <p>Kharazmi Hot Cup is Set Coffee</p>
          </div>
          <p>
            An experience spanning four generations and continuous engagement
            with consumers guarantee these qualities. One of the key features of
            Set Coffee is the direct import of raw materials by the management,
            ensuring the selection of the finest ingredients for coffee
            production.
          </p>
          <p>
            Set Coffee is the first coffee-related company in Iran to join the
            Speciality Coffee Association of Europe (SCAE) in 2007.
          </p>
        </section>
        <main className={styles.main}>
          <div>
            <span>Set Coffee</span>
            <p className={styles.title}>The Story of Set Coffee</p>
            <p>
              An experience spanning four generations and continuous engagement
              with consumers guarantee these qualities. One of the key features
              of Set Coffee is the direct import of raw materials by the
              management, ensuring the selection of the finest ingredients for
              coffee production.
            </p>
            <p>
              Set Coffee is the first coffee-related company in Iran to join the
              Speciality Coffee Association of Europe (SCAE) in 2007. The
              management has undergone specialized training in coffee processing
              at SCAE's educational workshops and has also attended specialized
              coffee roasting workshops in the United States, a pioneer in this
              industry. Now, leveraging past achievements and the latest global
              technology, we have entered the stage of industrial and
              large-scale coffee production. We are proud to announce that from
              now on, "Set Coffee" is an industrial brand in Iran's coffee
              industry.
            </p>
          </div>
          <div>
            <p>
              The journey that the founders of "Set Coffee" began in the 1940s
              has now entered a new phase. We are proud to announce that in
              February 2016, we obtained the necessary licenses from the
              Ministry of Health, Treatment, and Medical Education, as well as
              the Food and Drug Organization, transitioning from traditional and
              small-scale coffee production to industrial and mass production.
            </p>
            <p>
              Another achievement of the "Set Coffee" brand is obtaining the
              SCAE Coffee Diploma from the Specialty Coffee Association of
              Europe in April 2016.
            </p>
            <p>
              We hope that by acquiring up-to-date global knowledge in this
              industry, we can witness an improvement in quality and product
              diversity to meet international standards in the near future.
            </p>
            <p>License Holder: Kharazmi Hot Cup Company</p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default page