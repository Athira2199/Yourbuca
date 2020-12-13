const express=require('express')
const bodyParser=require("body-parser")
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const dbConnect=require('./config/db')
const app = express()
dbConnect()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.use(cookieSession({
    name: 'session',
    secret: 'yourbucca',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true)
    next();
});
app.use('/user',require('./routers/user'))

PORT = process.env.PORT || "5000"
app.listen(PORT, () => {
  console.log('Server is running at port 5000')
});