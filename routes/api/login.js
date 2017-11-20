const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const mysqlConf = require("../../config/mysqlconfig");

const con = mysql.createConnection(mysqlConf);

const { STATUS_200, LOGIN_422, LOGIN_422_BODY } = require("./status");

router.post("/login", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.body.email && req.body.password) {
    const sqlquery = "SELECT * FROM ?? WHERE email=? AND password=?";
    con.query(
      sqlquery,
      [process.env.ustable, req.body.email, req.body.password],
      (err, result) => {
        try {
          if (err) {
            throw err;
          }
          if (result.length > 0) {
            ///////////////////////////
            const sqlquery =
              "UPDATE ?? SET token=? WHERE email=? AND password=?";
            con.query(
              sqlquery,
              [
                process.env.ustable,
                process.env.token,
                req.body.email,
                req.body.password
              ],
              (err, result) => {
                try {
                  if (err) {
                    throw err;
                  }
                } catch (e) {
                  res.end(JSON.stringify(e));
                }
              }
            );
            ///////////////////////////
            res.status(STATUS_200);
            res.end(JSON.stringify({ token: process.env.token }));
          } else {
            res.status(LOGIN_422);
            res.end(JSON.stringify(LOGIN_422_BODY));
          }
        } catch (e) {
          res.end(JSON.stringify(e));
        }
      }
    );

    // res.status(LOGIN_200);
    // req.body.token = process.env.token;
    // res.end(JSON.stringify(req.body));
  }
  //  else {
  //   res.status(LOGIN_422);
  //   res.end(JSON.stringify(LOGIN_422_BODY));
  // }
});

module.exports = router;
