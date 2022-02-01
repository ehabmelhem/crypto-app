import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import CoinsTable from "./CoinsTable";

const getAllCrypto = async () => {
  return await axios
    .get("https://api.coinstats.app/public/v1/coins?skip=0&currency=EUR")
    .then((resp) => {
      return resp;
    })
    .catch(() => {
      return null;
    });
};

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getAllCrypto().then((data) => {
      setCoins(data.data.coins);
      console.log(data);
    });
  }, []);
  return (
    <div className="App">
      {/* {coins.map((coin, index) => {
        return <h3>{coin.id}</h3>;
      })} */}
      <CoinsTable  coins={coins}/>
    </div>
  );
}

export default App;
