const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mis",
});
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/getAllUsers", (req, res) => {
  con.query("select * from users", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get("/getUser/:userId", (req, res) => {
  let userId = req.params.userId;
  con.query(`select * from users where id = ${userId}`, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get("/validateUser/:values", (req, res) => {
  const values = req.params.values;
  const splitValue = values.split("&");
  const email = splitValue[0];
  const password = splitValue[1];
  con.query(`select * from users where email = "${email}" and password = "${password}"`, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post("/addUser", (req, res) => {
  const data = req.body;
  con.query("INSERT INTO users SET ?", data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteUser/:userId", (req, res) => {
  let userId = req.params.userId;
  con.query(`DELETE from users where id = ${userId}`, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
app.listen(4300);