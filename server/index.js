const express = require("express")
const path = require("path")
const adminRoutes = require("./api_admin")
const employeeRoutes = require("./api_employee")
var crypto = require("crypto")

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, "../client/build")))

var mysql = require("mysql")

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@sa",
  database: "pms",
})

con.connect(function (err) {
  if (err) throw err
  console.log("Databse Connected!")
})

app.get("/login", (req, res) => {
  con.query(
    "SELECT passw, salt ,is_admin as result, Employee_Id as id, COUNT(*) as count FROM login_details WHERE username = ? ",
    [req.query.username],
    function (err, result, fields) {
      var data
      if (err) {
        data = { error: 1 }
        res.send(data)
      } else {
        if (result[0].count > 0) {
          let hash = crypto
            .pbkdf2Sync(req.query.password, result[0].salt, 1000, 64, `sha512`)
            .toString(`hex`)
          if (hash == result[0].passw && result[0].result == 1) {
            data = { error: 0, isadmin: 1, id: result[0].id }
            res.send(data)
          } else if (hash == result[0].passw) {
            data = { error: 0, isadmin: 0, id: result[0].id }
            res.send(data)
          } else {
            data = { error: 1, errormsg: "Username/Password Invalid" }
            res.send(data)
          }
        } else {
          data = { error: 1, errormsg: "User not found" }
          res.send(data)
        }
      }
    }
  )
})

app.get("/getName", (req, res) => {
  con.query(
    "SELECT CONCAT(First_Name,' ', Last_Name) as name FROM employee WHERE Employee_Id = ?",
    [req.query.id],
    function (err, result) {
      if (err) throw err
      else {
        let data = { name: result[0].name }
        res.send(data)
      }
    }
  )
})

app.get("/changePass", (req, res) => {
  console.log(req.query)
  con.query(
    "SELECT passw, salt ,COUNT(*) as count FROM login_details WHERE Employee_Id = ? ",
    [req.query.id],
    function (err, result, fields) {
      var data
      if (err) {
        data = { error: 1 }
        res.send(data)
      } else {
        console.log("Result[0]Count", result[0].count)
        if (result[0].count > 0) {
          let hash = crypto
            .pbkdf2Sync(req.query.old, result[0].salt, 1000, 64, `sha512`)
            .toString(`hex`)
          if (hash == result[0].passw) {
            let salt = crypto.randomBytes(16).toString("hex")
            let hash = crypto
              .pbkdf2Sync(req.query.new, salt, 1000, 64, `sha512`)
              .toString(`hex`)
            con.query(
              "UPDATE login_details SET passw = ?, salt = ? WHERE Employee_Id = ?",
              [hash, salt, req.query.id],
              function (err, result) {
                if (err) throw err
                else {
                  data = { error: 0 }
                  res.send(data)
                }
              }
            )
          } else {
            console.log("Error Here Old Pass not matched")
            data = { error: 1 }
            res.send(data)
          }
        } else {
          data = { error: 1 }
          res.send(data)
        }
      }
    }
  )
})

app.get("/api/emp/details", (req, res) => {
  con.query(
    "SELECT * FROM employee ",

    function (err, result, fields) {
      var data
      if (err) {
        data = { error: 1 }
        res.send(data)
      } else {
        console.log(result)
      }
    }
  )
})

app.use("/api/admin/", adminRoutes)
app.use("/api/employee/", employeeRoutes)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
