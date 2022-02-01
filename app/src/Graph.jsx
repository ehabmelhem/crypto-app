import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Graph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import MenueButton from "./MenueButton";

const getCoinChart = async (coinId) => {
  return await axios
    .get(
      `https://api.coinstats.app/public/v1/charts?period=1m&coinId=${coinId}`
    )
    .then((resp) => {
      return resp;
    })
    .catch(() => {
      return null;
    });
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function Graph({ isUp, coinID }) {
  const [chart, setChart] = useState([]);
  useEffect(() => {
    getCoinChart(coinID).then((data) => {
      setChart(data.data.chart);
    });
  }, []);
  const labels = chart.map((item) => {
    return " ";
  });
  const data = {
    labels,
    datasets: [
      {
        label: `${coinID}`,
        data: chart.map((item, index) =>
          item.map((number) => {
            return number;
          })
        ),
        borderColor: isUp ? "rgb(46, 125, 50)" : "rgb(255, 0, 0)",
        radius: false,
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="graph">
      <Line className="width" options={options} data={data} />
    </div>
  );
}

export default Graph;
