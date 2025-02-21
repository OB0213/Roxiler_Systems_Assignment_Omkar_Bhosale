import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";

function BarGraphData({barData,loadingData}) {
      const monthNumber = useSelector((state) => state.transaction.countMonth);
      const [monthData,setMonthData]=useState('');
      const months = [
           "January",
           "February",
           "March",
           "April",
           "May",
           "June",
           "July",
           "August",
           "September",
           "October",
           "November",
           "December"
         ];
    
         useEffect(()=>{
            setMonthData(months[monthNumber-1]);
    
         },[monthNumber]);
    
  return (
    <div className="my-2">
      {loadingData ? (
        <div className="d-flex justify-content-center align-items-center">
          <div class="spinner-grow text-primary" role="status"></div>
          <div class="spinner-grow text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <h1 className="text-center">Bar Graph: {monthData}</h1>
          <h5 className="text-center">(Selected Month name from Dropdown)</h5>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="count" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default BarGraphData
