"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Monday",
    product1: 12,
    product2: 5,
    product3: 4,
    product4: 6,
    product5: 3,
    product6: 4,
  },
  {
    name: "Tuesday",
    product1: 8,
    product2: 4,
    product3: 6,
    product4: 3,
    product5: 2,
    product6: 8,
  },
  {
    name: "Wednesday",
    product1: 6,
    product2: 3,
    product3: 4,
    product4: 7,
    product5: 3,
    product6: 7,
  },
  {
    name: "Thursday",
    product1: 7,
    product2: 5,
    product3: 5,
    product4: 12,
    product5: 2,
    product6: 9,
  },
  {
    name: "Friday",
    product1: 4,
    product2: 6,
    product3: 3,
    product4: 7,
    product5: 1,
    product6: 12,
  },
];

export function SalesChart() {
  return (
    <div className="w-full h-[300px]">
      <LineChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="product1" stroke="#ff0000" />
        <Line type="monotone" dataKey="product2" stroke="#00ff00" />
        <Line type="monotone" dataKey="product3" stroke="#0000ff" />
        <Line type="monotone" dataKey="product4" stroke="#ff00ff" />
        <Line type="monotone" dataKey="product5" stroke="#00ffff" />
        <Line type="monotone" dataKey="product6" stroke="#ffff00" />
      </LineChart>
    </div>
  );
}
