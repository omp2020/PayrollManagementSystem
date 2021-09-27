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
router.get("/applyLeave",function (req, res){
    let data = JSON.parse(req.query.data)
    con.query(
        "INSERT INTO "
    )
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

module.exports = router
