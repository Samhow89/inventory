const express = require("express");
const app = express();

const mysql = require("mysql");
const { Model } = require("sequelize");

const db =  require("./modeltesting/model.js")

app.listen(3000, () => {
    console.log("running");
})