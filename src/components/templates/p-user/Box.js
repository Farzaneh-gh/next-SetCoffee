import React from 'react'
import styles from "./Box.module.css"
import { IoStatsChart } from "react-icons/io5";
const Box = ({title,value}) => {
  return (
    <div className={styles.box}>
      <span>{value}</span>
      <div>
        <p>{title}</p>
        <IoStatsChart  className={styles.icon}/>
      </div>
    </div>
  );
}

export default Box