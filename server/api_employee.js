const express = require("express")
const router = express.Router()
var mysql = require("mysql")
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@vitra3131",
  database: "pms",
})

con.connect(function (err) {
  if (err) throw err
})

router.get("/applyLeave", function (req, res) {
  let data = JSON.parse(req.query.data)
  con.query("INSERT INTO ")
})

router.get("/createdept", function (req, res) {
  let data = JSON.parse(req.query.data)
  con.query(
    "INSERT INTO department VALUES (?, ?)",
    [data.deptID, data.deptName],
    function (err) {
      var data
      if (err) {
        data = { error: 1 }
        res.send(data)
      } else {
        data = { error: 0 }
        res.send(data)
      }
    }
  )
})


router.get("/listdept", function (req, res) {
  let arr = []
  con.query("SELECT * FROM department", function (err, result) {
    if (err) throw err
    else {
      for (var i = 0; i < result.length; i++) {
        arr.push(result[i])
      }
      res.send(arr)
    }
  })
})

router.get("/employee/listsal", function (req, res) {
  let arr = []
  con.query("SELECT * FROM Salary_D", function (err, result) {
    if (err) throw err
    else {
      for (var i = 0; i < result.length; i++) {
        arr.push(result[i])
      }
      res.send(arr)
      // console.log(result);
    }
  })
})

router.get("/availableLeave", function (req, res) {
  con.query(
    "SELECT Available_Leave as leaves FROM leave_details WHERE Status='Approved' AND Employee_Id = ? ORDER BY Leave_Id DESC  LIMIT 1;",
    [req.query.id],
    function (err, result) {
      if (err) throw err
      else {
        if (result[0] == undefined) {
          let data = { leaves: "Error in Reading Leaves" }
          res.send(data)
        } else {
          let data = { leaves: result[0].leaves }
          res.send(data)
        }
      }
    }
  )
})

module.exports = router
