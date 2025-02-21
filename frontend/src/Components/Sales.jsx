import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Sales() {
  const monthNumber = useSelector((state) => state.transaction.countMonth);
  const [monthData, setMonthData] = useState("");
  const [loading, setLoading] = useState(true);
  const [userdata, setUserData] = useState({
    totalSale: 0,
    items_sold: 0,
    items_unsold: 0,
  });
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
    "December",
  ];

  useEffect(() => {
    setMonthData(months[monthNumber - 1]);
  }, [monthNumber]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `http://localhost:5000/routes/transactionDetails?month=${monthNumber}`,
        {}
      )
      .then((response) => {
        setLoading(false);
        setUserData({
          ...userdata,
          totalSale: response.data.data.totalSale,
          items_sold: response.data.data.soldElementCount,
          items_unsold: response.data.data.unsoldElementCount,
        });
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false);
      })
  }, [monthNumber]);
  return (
    <div className="w-100 my-2">
      <div className="px-2">
        {loading ? (
          <>
            <div className="d-flex justify-content-center align-items-center">
              <div class="spinner-grow text-primary" role="status"></div>
              <div class="spinner-grow text-primary" role="status"></div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center my-2 py-2">Statistics: {monthData}</h1>
            <div className="totalData bg-warning px-2 py-2 d-flex flex-column justify-content-center align-items-center">
              <h3>
                Total Sales:{" "}
                <span className="text-success fw-bold">
                  Rs.{userdata.totalSale}
                </span>
              </h3>
              <h3>
                Items Sold:
                <span className="text-primary fw-bold">
                  {userdata.items_sold}
                </span>
              </h3>
              <h3>
                Items Unsold:{" "}
                <span className="text-danger fw-bold">
                  {userdata.items_unsold}
                </span>
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sales;
