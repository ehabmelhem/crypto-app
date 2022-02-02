import React, { useEffect, useState } from "react";
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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};

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

function ChartCompare({ compareCoins, setCompareCoins }) {
  const [data_Chart, setData_Chart] = useState({});
  useEffect(() => {
    console.log(compareCoins);
    setData_Chart({
      labels: [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ],
      datasets: compareCoins,
    });
  }, []);
  return (
    <div className="chart__compare">
      {/* {data_Chart.datasets &&
        data_Chart.datasets.map((item) => {
          return <h3>{item}</h3>;
        })} */}
      {data_Chart.datasets && <Line options={options} data={data_Chart} />}
    </div>
  );
}

export default ChartCompare;
