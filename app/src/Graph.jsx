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
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    "x-axis-1": {
      display: false,
    },
    "y-axis-1": {
      type: "linear",
      display: false,
      position: "left",
    },
  },
};

function Graph({ isUp, coinID, setCharDataSet, chartDataSet }) {
  const [chart, setChart] = useState([]);
  useEffect(() => {
    getCoinChart(coinID).then((data) => {
      var object = {
        type: "line",
        label: `${coinID}`,
        data: data.data.chart.map((item, index) =>
          item.map((number) => {
            return number;
          })
        ),

        borderColor: "rgb(255, 0, 0)",
        radius: false,
        borderWidth: 2,
        pointBorderColor: "rgb(0,0,0,0)",
        pointBackgroundColor: "rgb(0,0,0,0)",
        pointHoverBackgroundColor: "#5AC53B",
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
      };
      setCharDataSet((chartDataSet) => [...chartDataSet, object]);
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
        type: "line",
        label: `${coinID}`,
        data: chart.map((item, index) =>
          item.map((number) => {
            return number;
          })
        ),
        borderColor: isUp ? "rgb(46, 125, 50)" : "rgb(255, 0, 0)",
        radius: false,
        borderWidth: 2,
        pointBorderColor: "rgb(0,0,0,0)",
        pointBackgroundColor: "rgb(0,0,0,0)",
        pointHoverBackgroundColor: "#5AC53B",
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
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
