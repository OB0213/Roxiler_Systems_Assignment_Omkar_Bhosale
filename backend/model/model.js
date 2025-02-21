const mongoose=require('mongoose');

//Schema designed for collection used for inserting data in mongodb
let saleData = new mongoose.Schema({
  id: {
    type: "Number",
    unique: true,
  },
  title: {
    type: "String",
  },
  price: {
    type: "Number",
  },
  description: {
    type: "String",
  },
  category:{
    type:"String"
  },
  image:{
    type:"String"
  },
  sold:{
    type:"Boolean"
  },
  dateOfSale:{
    type:"String"
  }
});

const dataModel=mongoose.model('saleData',saleData);
module.exports=dataModel;