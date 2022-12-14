import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ complexityGraph, dataModernizationCss }) => {
    const labels = ["Very Complex", "Complex", "Medium", "Simple", "Trivial"];

  const [pieChart, setPieChart] = useState({
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: labels.map((e) => {
            let obj = complexityGraph?.find(o => o.complexityType === e);
            return (obj && obj.count) ? obj.count : 0
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
            }
          },
      }}
      data={pieChart}
    />
  );
};

export default PieChart;
