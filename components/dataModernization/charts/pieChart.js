import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ complexityGraph, dataModernizationCss, labels, data }) => {
  const [pieChart, setPieChart] = useState({
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: data,
        backgroundColor: [
          "rgba(116, 166, 192, 0.8)",
          "rgba(161, 242, 189, 0.6)",
          "rgba(251, 227, 160, 0.6)",
          "rgba(241, 162, 174, 0.6)",
          "rgba(239, 83, 80, 0.5)",
        ],
        borderColor: [
          "rgba(116, 166, 192, 1)",
          "rgba(161, 242, 189, 1)",
          "rgba(251, 227, 160, 1)",
          "rgba(241, 162, 174, 1)",
          "rgba(239, 83, 80, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <Pie
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
