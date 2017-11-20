const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const mysqlConf = require("../../config/mysqlconfig");

const con = mysql.createConnection(mysqlConf);

const { STATUS_200, STATUS_401 } = require("./status");

router.get("/me", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const sqlquery = "SELECT * FROM ?? WHERE token=?";
  con.query(
    sqlquery,
    [process.env.ustable, req.headers.authorization],
    (err, result) => {
      try {
        if (err) {
          throw err;
        }
        if (result.length > 0) {
          res.status(STATUS_200);
          res.end(
            JSON.stringify(
              result.map(val => ({
                id: val.id,
                phone: val.phone,
                name: val.name,
                email: val.email
              }))[0]
            )
          );
        } else {
          res.status(STATUS_401);
          res.end({});
        }
      } catch (e) {
        res.end(JSON.stringify(e));
      }
    }
  );
});

////////////////////////////
router.post("/me", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const sqlquery = "SELECT * FROM ?? WHERE token=?";
  con.query(
    sqlquery,
    [process.env.ustable, req.headers.authorization],
    (err, result) => {
      try {
        if (err) {
          throw err;
        }
        console.log(result[0].token);
        if (result[0].token === req.headers.authorization) {
          res.status(STATUS_200);
          ////////////////////////////////////////
          let inFields = "";
          let aliases = [];
          for (let key in req.body) {
            inFields += ` ${key}=?, `;
            aliases.push(req.body[key]);
          }
          inFields = inFields.slice(0, -2);
          const sqlquery = `UPDATE ?? SET ${inFields} WHERE token=?`;
          con.query(
            sqlquery,
            [process.env.ustable, ...aliases, process.env.token],
            (err, result) => {
              try {
                if (err) {
                  throw err;
                } else {
                  res.end(JSON.stringify(req.body));
                }
              } catch (e) {
                res.end(JSON.stringify(e));
              }
            }
          );
          ////////////////////////////////////////
        } else {
          res.status(STATUS_401);
          res.end({});
        }
      } catch (e) {
        res.end(JSON.stringify(e));
      }
    }
  );
});

module.exports = router;
