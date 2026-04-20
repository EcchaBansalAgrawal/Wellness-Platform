import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", stress: 3 },
  { name: "Tue", stress: 4 },
  { name: "Wed", stress: 2 },
  { name: "Thu", stress: 5 },
  { name: "Fri", stress: 3 },
];

function ChartComponent() {
  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="stress" stroke="#8884d8" />
    </LineChart>
  );
}

export default ChartComponent;