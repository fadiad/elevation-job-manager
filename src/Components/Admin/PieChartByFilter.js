
import "../../styles/PieChartByFilter.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell,Legend } from "recharts";
import '../../styles/Admin.css';
const COLORS = ["#426696", "#ff96aa"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChartByFilter(props) {
  const employed = [
    { name: "Employeed", value: props.employed },
    { name: "Un-Employeed", value: props.unEmployed },

  ];
  const Process = [
    { name: "In Progress", value: props.InProcess },
    { name: "Not Active", value: props.NotActive },

  ];

  return (
    <div className="charts">
      <PieChart width={300} height={200}>
      <Legend layout="vertical" verticalAlign="bottom" align="left" label/>
        <Pie data={employed} cx={80} cy={100} labelLine={true} label outerRadius={80} fill="#8884d8"  >
          {employed.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
     
      <PieChart width={300} height={200}>
      <Legend layout="vertical" verticalAlign="bottom" align="left" />
        <Pie data={Process} cx={80} cy={100} labelLine={true} outerRadius={80} fill="#8884d8" >
          {Process.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
