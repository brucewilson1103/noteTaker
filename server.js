var express = require("express");
var path = require("path");
var connection = require("./db/connection");
require('dotenv').config()
var apiRoutes = require("./routes/apiRoutes");
// var htmlRoutes = require("./routes/htmlRoutes");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(apiRoutes);
// app.use(htmlRoutes);

app.listen(PORT, function(){
  console.log("APP is rocking and rolling.")
});