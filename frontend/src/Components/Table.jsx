import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMonth, addTransaction } from "../Redux/sliceData.js";
import axios from "axios";
import TableDetails from "./TableDetails.jsx";

function Table() {
  const month = useSelector((state) => state.transaction.countMonth);
  const searchTransaction = useSelector(
    (state) => state.transaction.searchTransaction
  );
  const [loading, setLoading] = useState(true);
  const [arraydata, setArraydata] = useState([]);
  const [totalpageNumbers, setTotalPageNumbers] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function incrementPageData(pageData) {
    let totalPages = Math.floor(pageData / 10);
    if (pageNumber <= totalPages - 1) {
      setPageNumber(pageNumber + 1);
    } else {
      alert("Data is completed.");
      setPageNumber(1);
    }
  }

  function decrementPageData(pageData) {
    let totalPages = Math.floor(pageData / 10);
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      alert("You cannot go to previous at this point");
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/routes/getDataForTable?month=${month}&transaction=${searchTransaction}&paginationNumber=${pageNumber}`
      )
      .then((response) => {
        setArraydata(response.data.data);
        setTotalPageNumbers(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [month, searchTransaction, pageNumber]);
  const months = [
    {
      monthname: "Jan",
      month: 1,
    },
    {
      monthname: "Feb",
      month: 2,
    },
    {
      monthname: "Mar",
      month: 3,
    },
    {
      monthname: "Apr",
      month: 4,
    },
    {
      monthname: "May",
      month: 5,
    },
    {
      monthname: "Jun",
      month: 6,
    },
    {
      monthname: "Jul",
      month: 7,
    },
    {
      monthname: "Aug",
      month: 8,
    },
    {
      monthname: "Sep",
      month: 9,
    },
    {
      monthname: "Oct",
      month: 10,
    },
    {
      monthname: "Nov",
      month: 11,
    },
    {
      monthname: "Dec",
      month: 12,
    },
  ];

  return (
    <div className="h-100">
      <div className="d-flex d-flex-column d-lg-flex-row justify-content-between align-items-center my-2 mx-2">
        <div className="w-25">
          <h5 className="text-center">Search Transactions:</h5>
          <input
            type="text"
            placeholder="Search transaction"
            onChange={(e) => dispatch(addTransaction(e.target.value))}
            className="form-control border border-2 border-black"
          ></input>
        </div>
        <div className="w-25">
          <h5 className="text-center">Select Month:</h5>
          <select
            onChange={(e) => dispatch(addMonth(e.target.value))}
            className="form-select border border-2 border-black"
          >
            {months.map((elements, index) =>
              elements.monthname === "Mar" ? (
                <option value={elements.month} selected>
                  {elements.monthname}
                </option>
              ) : (
                <option value={elements.month}>{elements.monthname}</option>
              )
            )}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div class="spinner-grow text-primary" role="status"></div>
          <div class="spinner-grow text-primary" role="status"></div>
        </div>
      ) : arraydata.length === 0 ? (
        <h1 className="text-center text-danger px-2 py-2">'Data Not Found'</h1>
      ) : (
        <TableDetails
          elements={arraydata}
          pageNumbers={totalpageNumbers}
          decrementPageData={decrementPageData}
          incrementPageData={incrementPageData}
          pageNumber={pageNumber}
        />
      )}
    </div>
  );
}

export default Table;
