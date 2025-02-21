import { useEffect, useState,lazy,Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import { addMonth,addTransaction } from './Redux/sliceData';

import axios from 'axios';

const Table=lazy(()=>import('./Components/table.jsx'));
const Sales=lazy(()=>import('./Components/Sales.jsx'));
const BarData=lazy(()=>import('./Components/BarData.jsx'));

function App() {
 useEffect(()=>{
  axios.get(`http://localhost:5000/routes/getAllData`).then((response)=>{
    console.log(response.data);
  }).catch((err)=>{
    console.log(err);
  })

 },[]);

 

  return (
    <div className="mainContainer">
      <div className="container-fluid">
        <div className="title text-center">
          <h1 className="py-2">Transaction Dashboard</h1>
        </div>
        <Suspense>
          <Table />
        </Suspense>
        <Suspense>
          <Sales />
        </Suspense>
        <Suspense>
          <BarData />
        </Suspense>
        {/* <Sales />
        <BarData/> */}
      </div>
    </div>
  );
}

export default App
