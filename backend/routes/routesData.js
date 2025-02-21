const express = require("express");
const dataModel = require("../model/model.js");
const {getAllData,getDataForTable,transactionDetails,priceRangeBarGraph,categoryRangePieChart,combinationOfAllGraphApi}=require('../routeFunction/routeFunction.js');
const axios=require('axios');
const router = express.Router();

router.get("/getAllData",getAllData);//To initialize database with seed Data from api

router.get("/getDataForTable",getDataForTable);//to get paginated and month data along with filters such as price title and description

router.get('/transactionDetails',transactionDetails);//To give sales detail of each month

router.get('/priceRangeBarGraph',priceRangeBarGraph);//Bar graph of number of items at each price range

router.get('/categoryRangePieChart',categoryRangePieChart);//Gives data for pie chart of category element

router.get('/combinationOfAllGraphApi',combinationOfAllGraphApi);//Combination of 3 api's

module.exports = router;
