const dataModel = require("../model/model.js");
const axios = require("axios");

exports.getAllData = async (req, res) => {
  try {
    let response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    let collectionData = await response.json();
    let mydelete = await dataModel.deleteMany();
    // res.send({ data: collectionData });
    if (mydelete) {
      if (collectionData) {
        console.log(collectionData.length);
        await dataModel.insertMany(collectionData);
        let mydata = await dataModel.find();
        if (mydata) {
          if (mydata.length === collectionData.length) {
            res.send({ message: "Data Inserted Successfully" });
          }
        }
      } else {
        console.log("Data not inserted");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getDataForTable = async (req, res) => {
  try {
    const { month, transaction, paginationNumber } = req.query;
    let month1 = parseInt(month);
    let transaction1 = transaction;
    let paginationNumber1 = parseInt(paginationNumber);
    let mydata = await dataModel.find();
    mydata.forEach((element, index) => {
      let myValue = element.dateOfSale.split("T");
      element.dateOfSale = myValue[0];
    });
    if (month) {
      let otherData = mydata.filter(
        (value, index) =>
          parseInt(month1) === parseInt(value.dateOfSale.split("-")[1])
      );
      let otherDataLength = otherData.length;
      if (otherData.length === 0) {
        let mydataLength = mydata.length;
        mydata = mydata.filter(
          (element, index) =>
            index >= (paginationNumber1 - 1) * 10 &&
            index < paginationNumber1 * 10
        );

        mydata = mydata.filter(
          (element, index) =>
            element.price.toString().includes(transaction) ||
            element.description.includes(transaction1) ||
            element.title.includes(transaction1)
        );
        res.send({ data: mydata, length: mydata.length });
      } else {
        otherData = otherData.filter(
          (element, index) =>
            index >= (paginationNumber1 - 1) * 10 &&
            index < paginationNumber1 * 10
        );

        otherData = otherData.filter(
          (element, index) =>
            element.price === parseFloat(transaction1) ||
            element.description
              .toLowerCase()
              .includes(transaction1.toLowerCase()) ||
            element.title.toLowerCase().includes(transaction1.toLowerCase())
        );
        res.send({ data: otherData, length: otherData.length });
      }
    } else {
      let otherData1 = mydata.filter(
        (element, index) =>
          index >= (paginationNumber1 - 1) * 10 &&
          index < paginationNumber1 * 10
      );

      otherData1 = otherData1.filter(
        (element, index) =>
          element.price === parseFloat(transaction1) ||
          element.description
            .toLowerCase()
            .includes(transaction1.toLowerCase()) ||
          element.title.toLowerCase().includes(transaction1.toLowerCase())
      );

      console.log(otherData1);
      if (otherData1.length < 10) {
        res.send({ data: otherData1, length: otherData1.length });
      } else {
        res.send({ data: otherData1, length: mydata.length });
      }

    }
  } catch (err) {
    console.log(err);
  }
};

exports.transactionDetails = async (req, res) => {
  try {
    let month = parseInt(req.query.month);
    console.log(month);
    month = parseInt(month);
    let details = await dataModel.find();
    details = details.filter(
      (value, index) => month === parseInt(value.dateOfSale.split("-")[1])
    );
    let sum = 0;
    let soldElementCount = 0;
    let unsoldElementCount = 0;
    details.forEach((element, index) => {
      if (element.sold == true) {
        sum = sum + parseFloat(element.price);
        soldElementCount++;
      }
    });
    details.forEach((element, index) => {
      if (element.sold === false) {
        unsoldElementCount++;
      }
    });

    res.send({
      data: {
        totalSale: sum,
        soldElementCount: soldElementCount,
        unsoldElementCount: unsoldElementCount,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

function myFilterFunction(arraydata, minValue, maxValue) {
  return arraydata.filter(
    (element, index) => element.price >= minValue && element.price <= maxValue
  ).length;
}

exports.priceRangeBarGraph = async (req, res) => {
  let month = parseInt(req.query.month);
  month = parseInt(month);
  let mydata = await dataModel.find();
  mydata = mydata.filter(
    (element, index) => month === parseInt(element.dateOfSale.split("-")[1])
  );
  console.log(mydata);
  let myArray = [];
  let count1 = myFilterFunction(mydata, 0, 100);
  let count2 = myFilterFunction(mydata, 101, 200);
  let count3 = myFilterFunction(mydata, 201, 300);
  let count4 = myFilterFunction(mydata, 301, 400);
  let count5 = myFilterFunction(mydata, 401, 500);
  let count6 = myFilterFunction(mydata, 501, 600);
  let count7 = myFilterFunction(mydata, 601, 700);
  let count8 = myFilterFunction(mydata, 701, 800);
  let count9 = myFilterFunction(mydata, 801, 900);
  let count10 = mydata.filter((element, index) => element.price >= 901).length;
  res.send({
    data: [
      { name: "0-100", count: count1 },
      { name: "101-200", count: count2 },
      { name: "201-300", count: count3 },
      { name: "301-400", count: count4 },
      { name: "401-500", count: count5 },
      { name: "501-600", count: count6 },
      { name: "601-700", count: count7 },
      { name: "701-800", count: count8 },
      { name: "801-900", count: count9 },
      { name: "900 and above", count: count10 },
    ],
  });
};

exports.categoryRangePieChart = async (req, res) => {
  let month = parseInt(req.query.month);
  let mydata = await dataModel.find();
  details = mydata.filter(
    (value, index) => month === parseInt(value.dateOfSale.split("-")[1])
  );
  let myArray = [];
  mydata.forEach((element, index) => {
    myArray.push(element.category);
  });

  myArray = myArray.filter(
    (element, index) => myArray.indexOf(element) == index
  );
  let myData = [];
  myArray.forEach(async (element, index) => {
    let countData = details.filter(
      (elementData, index) => elementData.category === element
    ).length;
    myData.push({ category: element, count: countData });
  });

  res.send({ data: myData });
};

exports.combinationOfAllGraphApi = async (req, res) => {
  let month = parseInt(req.query.month);

  const [transactionDetails, priceRangeBarGraph, categoryRangePieChart] =
    await Promise.all([
      axios.get(`http://localhost:5000/routes/transactionDetails/${month}`),
      axios.get(`http://localhost:5000/routes/priceRangeBarGraph/${month}`),
      axios.get(`http://localhost:5000/routes/categoryRangePieChart/${month}`),
    ]);
  res.send({
    data: {
      transactionDetails: transactionDetails.data,
      priceRangeBarGraph: priceRangeBarGraph.data,
      categoryRangePieChart: categoryRangePieChart.data,
    },
  });
};
