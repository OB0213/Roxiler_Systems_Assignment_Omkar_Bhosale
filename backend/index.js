const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const router=require('./routes/routesData.js');
const dotenv=require('dotenv');
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/routes',router);
mongoose
  .connect(
   process.env.MONGO_URL
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



