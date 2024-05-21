const { json, urlencoded } = require("body-parser");
const { isUtf8 } = require("buffer");
const express = require("express");

const path = require("path");
const app = express();
const fs=require('fs');

const routers = require('./routes/routers');

app.use(express.urlencoded({ extended: true })); 

const session = require('express-session');
const { request } = require("http");
const { error } = require("console");
app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "publik")));
app.set('view engine', 'ejs');

app.use('/', routers)
const port = 4000;
app.listen(port, () => {
  console.log("server started");
});










