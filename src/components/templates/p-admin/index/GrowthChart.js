"use client";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  LineChart,
} from "recharts";
const SaleChart = () => {
const data = [
  { name: "January", current: 4000, previous: 3000 },
  { name: "February", current: 3200, previous: 2500 },
  { name: "March", current: 5500, previous: 4000 },
  { name: "April", current: 4700, previous: 3500 },
  { name: "May", current: 6200, previous: 4800 },
  { name: "June", current: 8000, previous: 6000 },
  { name: "July", current: 7200, previous: 5000 },
  { name: "August", current: 8500, previous: 7000 },
  { name: "September", current: 7500, previous: 5400 },
  { name: "October", current: 9000, previous: 6500 },
  { name: "November", current: 9700, previous: 7200 },
  { name: "December", current: 11000, previous: 8000 },
];



  return (
    <LineChart
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
     <Line type="monotone" dataKey="current" stroke="#711D1C" />
        <Line type="monotone" dataKey="previous" stroke="#000" />
      </LineChart>

  );
};

export default SaleChart;
