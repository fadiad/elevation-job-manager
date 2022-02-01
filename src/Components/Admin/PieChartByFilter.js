
import "../../styles/PieChartByFilter.css";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

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
    { name: "Group A", value: props.employed },
    { name: "Group B", value: props.unEmployed },

  ];
  const Process = [
    { name: "Group A", value: props.InProcess },
    { name: "Group B", value: props.NotActive },

  ];


  return (
    <div>
      <div>
        <span>employed   {props.employed}  </span><br />
        <span>unEmployed {props.unEmployed}</span><br />
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={employed}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {employed.map((entry, index) => (
            
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

      </PieChart>
      <div>
        <span>InProcess  {props.InProcess} </span>
        <br />
        <span>NotActive  {props.NotActive} </span>
      </div>
      <PieChart width={400} height={400}>

        <Pie
          data={Process}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {Process.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
