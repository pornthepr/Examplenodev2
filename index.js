const express = require('express');
const mysql = require('mysql');

var cors = require('cors');
const app = express();

app.use(express.json()); //แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Object
app.use(cors()); //CORS เป็นกลไกที่ web browser ใช้เวลาที่ client ส่ง request ไปยัง server ที่มี domain ต่างกัน
app.use(express.urlencoded({extended:true})); //// แปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to node application." });
  });
  
require("./app/routes/customer.routes.js")(app);

app.listen(3000,()=>{
    console.log("Listen on port 3000 .... ");
});

//Adapted from https://www.bezkoder.com/node-js-rest-api-express-mysql/
//Code