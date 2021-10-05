const express = require("express")
const router = express.Router()
var mysql = require("mysql")
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
<<<<<<< HEAD
  password: "YourRootPassword",
=======
  password: "P@vitra3131",
>>>>>>> 865a232e4771cd1000a1d5a7115bc208098c3cba
=======
  password: "admin@sa",
>>>>>>> 581f562f181c0bf26b4090a465a58fb1f9b3716a
  database: "pms",
})

con.connect(function (err) {
  if (err) throw err
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

router.get("/createUser", function (req, res) {
  let data = JSON.parse(req.query.data)
  con.query(
    "INSERT INTO `pms`.`employee` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      data.empID,
      data.fname,
      data.lname,
      data.mobile,
      data.dob,
      data.designation,
      data.dept,
      data.hdate,
      data.city,
      data.state,
    ],
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

router.get("/getCntEMP", function (req, res) {
  con.query("SELECT COUNT(*) as Result FROM employee;", function (err, result) {
    if (err) throw err
    else {
      var data
      data = { empCnt: result[0].Result }
      res.send(data)
    }
  })
})

router.get("/getCntDEP", function (req, res) {
  con.query(
    "SELECT COUNT(*) as Result FROM department;",
    function (err, result) {
      if (err) throw err
      else {
        var data
        data = { depCnt: result[0].Result }
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

router.get("/listpleave", function (req, res) {
  let arr = []
  con.query("SELECT * FROM AccRejLeave", function (err, result) {
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

router.get("/listsalary", function (req, res) {
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

module.exports = router
