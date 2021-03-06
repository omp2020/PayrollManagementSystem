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

router.get("/leavestatus", function (req, res) {
  con.query(
    "SELECT COUNT(Status) as Leaves, status FROM pms.leave_details group by status ORDER BY status",
    function (err, result) {
      var arr = []
      if (err) {
        throw err
      } else {
        for (var i = 0; i < result.length; i++) {
          arr.push(result[i])
        }
        res.send(arr)
      }
    }
  )
})

router.get("/delDept", function (req, res) {
  con.query(
    "DELETE FROM department WHERE Department_Id = ?",
    [req.query.id],
    function (err) {
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
  con.query(
    "SELECT * FROM AccRejLeave WHERE status like 'Pending'",
    function (err, result) {
      if (err) throw err
      else {
        for (var i = 0; i < result.length; i++) {
          arr.push(result[i])
        }
        res.send(arr)
        // console.log(result);
      }
    }
  )
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

router.get("/listpay", function (req, res) {
  let arr = []
  con.query("SELECT * FROM payment", function (err, result) {
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

router.get("/Edet", function (req, res) {
  let arr = []
  con.query("SELECT * FROM employee", function (err, result) {
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
router.get("/Ddet", function (req, res) {
  let arr = []
  con.query("SELECT * FROM department", function (err, result) {
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
router.get("/AccLeave", function (req, res) {
  let arr = []
  con.query(
    "CALL UPDATE_SALARY(?,?)",
    [req.query.id, req.query.status],
    function (err, result) {
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
    }
  )
})

router.get("/payroll", function (req, res) {
  let arr = []
  con.query(
    "UPDATE pay SET pay_status=1 WHERE Employee_Id=?",
    [req.query.id],
    function (err, result) {
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
    }
  )
})
module.exports = router
