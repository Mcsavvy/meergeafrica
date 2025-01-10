"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
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
    product2: 2,
    product3: 3,
    product4: 5,
    product5: 12,
    product6: 7,
  },
];

export function SalesChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            stroke="#666" 
            fontSize={12}
            tickMargin={10}
          />
          <YAxis 
            stroke="#666" 
            fontSize={12}
            tickMargin={10}
          />
          <Tooltip 
            contentStyle={{ 
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="product1"
            stroke="#FF0000"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product 1"
          />
          <Line
            type="monotone"
            dataKey="product2"
            stroke="#FF6B00"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product 2"
          />
          <Line
            type="monotone"
            dataKey="product3"
            stroke="#FFB800"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product 3"
          />
          <Line
            type="monotone"
            dataKey="product4"
            stroke="#00B2FF"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product 4"
          />
          <Line
            type="monotone"
            dataKey="product5"
            stroke="#00FF66"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product 5"
          />
          <Line
            type="monotone"
            dataKey="product6"
            stroke="#0066FF"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Product 6"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
