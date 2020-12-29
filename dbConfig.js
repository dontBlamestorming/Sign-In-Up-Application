"use strict";

const mysql = require("mysql");
// have to 'npm install --save mysql'
const fs = require("fs");
const data = fs.readFileSync("./dbConfigInfo.json");
const conf = JSON.parse(data);

const db = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

module.exports = db;
