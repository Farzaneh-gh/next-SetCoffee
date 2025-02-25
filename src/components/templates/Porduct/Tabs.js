'use client'
import React , { useState } from 'react'
import Description from './Description'
import MoreInfoes from './MoreInfoes'
import Comments from '@/components/templates/Porduct/Comments/Comments'
import styles from './Tabs.module.css'
const Tabs = ({productData}) => {
  const [selectedTab, setSelectedTab] = useState('description');
  const handelSelectedTab = (tab) => setSelectedTab(tab);
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <span
          onClick={() => handelSelectedTab("description")}
          className={selectedTab === "description" ? styles.selectedTab : ""}
        >
          Description
        </span>
        <span
          onClick={() => handelSelectedTab("moreInfoes")}
          className={selectedTab === "moreInfoes" ? styles.selectedTab : ""}
        >
          More Information
        </span>
        <span
          onClick={() => handelSelectedTab("comments")}
          className={selectedTab === "comments" ? styles.selectedTab : ""}
        >
          Comments
        </span>
      
      </div>
      
      {selectedTab === "description" && <Description DescriptionData={productData}/>}
      {selectedTab === "moreInfoes" && <MoreInfoes moreInfoData={productData}/>}
      {selectedTab === "comments" && <Comments commentsData={productData} />}
    </div>
  );
}

export default Tabs