import React, { useState, useEffect,lazy } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BarGraphData from "./BarGraphData";

function BarData() {
  const monthNumber = useSelector((state) => state.transaction.countMonth);
  const [loading, setLoading] = useState(true);
  const [userdata, setUserData] = useState([]);
  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `http://localhost:5000/routes/priceRangeBarGraph?month=${monthNumber}`,
        {}
      )
      .then((response) => {
        setUserData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false);
      })
  }, [monthNumber]);

  return (
    <div className="w-100">
     (
        <BarGraphData barData={userdata} loadingData={loading} />
      )
    </div>
  );
}

export default BarData;
