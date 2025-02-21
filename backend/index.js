const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const router=require('./routes/routesData.js');
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/routes',router);
mongoose
  .connect(
    "mongodb+srv://omkarbhosale912:JyCJHPDUZJ6sBoSX@cluster0.gcexi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((data) => {
    console.log("Mongodb connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen(5000,function(){
    console.log('Port 5000 running successfully');
  })



