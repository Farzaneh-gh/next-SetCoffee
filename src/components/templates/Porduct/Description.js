import React from 'react'
import styles from "./Description.module.css"
const Description = ({ DescriptionData }) => {
  return (
    <div className={styles.description_container}>
      <h3 className={styles.description_title}>Description</h3>
      <hr />
      <div className={styles.description_info}>
        <p>{DescriptionData.name}</p>
        <p>South and Central America and Africa (100% ARABICA)</p>
        <p>{DescriptionData.shortdescription}</p>
      </div>
      <div className={styles.description_text}>
        <p>
          {DescriptionData.longDescription}
        </p>
      </div>
    </div>
  );
};

export default Description