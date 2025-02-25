import React from "react";

const MoreInfoes = ({moreInfoData}) => {
  return (
    <div style={{ marginTop: "2rem"}}> 
      <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "black"}}>More Information</p>
      <hr style={{ margin: "1rem 0"}}/>
      <main>
        <div style={{ display: "flex", justifyContent: "space-between", color: "black",  margin: "1rem 0"}}>
          <p>Weight</p>
          <p>{moreInfoData.weight}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "black"}}>
          <p>Smell</p>
          <p>{moreInfoData.smell}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "black", marginTop: "1rem"}}>
          <p>suitable For:</p>
          <p>{moreInfoData.suitableFor}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
