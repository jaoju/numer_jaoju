  
const express = require('express');
const mongoose = require('mongoose');
const app = express();  
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const cors = require("cors") 
app.use(cors());

//routes
app.get('/',(req, res) => {

});

const Bisec = require('./routes/Bisec') //ตัวหน้าถูกเรียก

app.use('/Bisec',Bisec);

//ConnectDB
mongoose.connect('mongodb+srv://jaoju:bbubble1a@cluster0-rasc8.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,userMongoClient:true}) 
console.log('HI connected DB')

app.listen(8000);