const express = require("express")
const router = express.Router()
var mysql = require("mysql")
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@sa",
  database: "pms",
})

con.connect(function (err) {
  if (err) throw err
})

router.get("/applyLeave", function (req, res) {
  let data1 = JSON.parse(req.query.data)
  console.log(data1)
  con.query("CALL INSERT_LEAVE(?,?,?,?,?,?)", [data1.emp_id,data1.leave,data1.day,data1.fromDate,data1.toDate,data1.Reason],function(err, result) {
  //   emp_id: '101',
  // leave: 'sick leave',
  // day: 'full',
  // fromDate: '2021-10-08',
  // toDate: '2021-10-09',
  // Reason: 'fever'
    if (err) throw err
    else {
      var data
      if (err) {
        data = { error: 1 }
        res.send(data)
      } else {
        data = { error: 0 }
        res.send(data)
      }
      
    }
  })
 

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


router.get("/eDet", function (req, res) {
  let arr = {}
  // console.log(req.query.id)
  con.query(
    "SELECT * FROM employee WHERE Employee_Id=?",
    [req.query.id],
    function (err, result) {
      if (err) throw err
      else {
        arr = result[0]
        res.send(arr)
      }
    }
  )
})


router.get("/listsalary", function (req, res) {
  let arr = []
  console.log(req.query.id)
  con.query("SELECT * FROM Salary_D WHERE Employee_Id=?",[req.query.id], function (err, result) {
    if (err) throw err
    else {
      for (var i = 0; i < result.length; i++) {
        arr.push(result[i])
      }
      res.send(arr)
    }
  })
})

module.exports = router
