import React from 'react'
import { PiCoffeeFill } from "react-icons/pi";
import { BiSolidContact } from "react-icons/bi";
import {
  FaEnvelopeOpenText,
  FaInternetExplorer,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./Information.module.css";
const Information = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Contact Us</p>
      <p className={styles.subtitle}>Information</p>
      <div className={styles.content}>
        <PiCoffeeFill />
        <p>Kharazmi Hot Cup Company (Set Coffee Factory)</p>
      </div>

      <div className={styles.content}>
        <FaInternetExplorer />
        <p>set-coffee.com</p>
      </div>
      <div className={styles.content}>
        <BiSolidContact />
        <p>Carrer de Mallorca, 234, 08008 Barcelona, Spain</p>
      </div>
      <div className={styles.content}>
        <FaPhone />
        <p> +34 931 234 567</p>
      </div>

      <div className={styles.content}>
        <FaEnvelopeOpenText />
        <p>coffee@set-coffee.com</p>
      </div>
      <div className={styles.content}>
        <FaEnvelopeOpenText />
        <p>coffee@set-coffee.com</p>
      </div>
      <div className={styles.content}>
        <FaTelegramPlane />
        <p>Contact management via WhatsApp or Telegram: +34 931 234 567 </p>
      </div>
    </div>
  );
}

export default Information