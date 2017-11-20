const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const mysqlConf = require("../../config/mysqlconfig");

const con = mysql.createConnection(mysqlConf);

const { STATUS_200, REGISTER_422, REGISTER_422_BODY } = require("./status");

router.post("/register", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.body.email && req.body.password) {
    const sqlquery =
      "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?);";
    console.log(req.body);
    con.query(
      sqlquery,
      [
        process.env.ustable,
        "phone",
        "name",
        "email",
        "password",
        "token",
        req.body.phone,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.token
      ],
      (err, result) => {
        try {
          if (err) {
            throw err;
          } else {
            res.status(STATUS_200);
            res.end(JSON.stringify(req.body));
          }
        } catch (e) {
          res.end(JSON.stringify(e));
        }
      }
    );
  } else {
    res.status(REGISTER_422);
    res.end(JSON.stringify(REGISTER_422_BODY));
  }
});

module.exports = router;
