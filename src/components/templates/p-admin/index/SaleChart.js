"use client";
import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
const SaleChart = () => {
    const data = [
      { name: "January", sales: 4000 },
      { name: "February", sales: 3000 },
      { name: "March", sales: 5000 },
      { name: "April", sales: 4500 },
      { name: "May", sales: 6000 },
      { name: "June", sales: 7000 },
      { name: "July", sales: 6500 },
      { name: "August", sales: 7200 },
      { name: "September", sales: 6800 },
      { name: "October", sales: 7500 },
      { name: "November", sales: 8000 },
      { name: "December", sales: 9000 },
    ];


     return (
       <AreaChart
         width={500}
         height={400}
         data={data}
         margin={{
           top: 10,
           right: 30,
           left: 0,
           bottom: 0,
         }}
         fontSize={12}
       >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Area
           type="monotone"
           dataKey="sales"
           stroke="#8884d8"
           fill="#8884d8"
         />
       </AreaChart>
     );
}

export default SaleChart