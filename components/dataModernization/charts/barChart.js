import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ complexityGraph, dataModernizationCss }) => {
    console.log(complexityGraph)



//     Trivial
// Simple
// Medium
// Complex
// Very Complex

    const labels = ["Very Complex", "Complex", "Medium", "Simple", "Trivial"];

  const [pieChart, setPieChart] = useState({
    labels: labels,
    datasets: [
      {
        label: "orange",
        data: labels.map((e) => {
            let obj = complexityGraph?.find(o => o.complexityType === e);
            return (obj && obj.count) ? obj.count : 0
        }),
        backgroundColor: [
          "rgba(239, 83, 80, 0.5)",
          "rgba(241, 162, 174, 0.6)",
          "rgba(251, 227, 160, 0.6)",
          "rgba(161, 242, 189, 0.6)",
          "rgba(116, 166, 192, 0.8)",
        ],
        borderColor: [
          "rgba(239, 83, 80, 1)",
          "rgba(241, 162, 174, 1)",
          "rgba(251, 227, 160, 1)",
          "rgba(161, 242, 189, 1)",
          "rgba(116, 166, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <Bar
      options={{
        responsive: true,
        // indexAxis: "y",
        plugins: {
          legend: {
            position: "top",
          },
        },
      }}
      data={pieChart}
    />
  );
};

export default BarChart;
