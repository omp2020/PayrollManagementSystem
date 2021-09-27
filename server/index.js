const express = require("express")
const path = require("path")
const adminRoutes = require("./api_admin")

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, "../client/build")))

var mysql = require("mysql")

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@vitra3131",
  database: "pms",
})

con.connect(function (err) {
  if (err) throw err
  console.log("Databse Connected!")
})

app.get("/login", (req, res) => {
  con.query(
    "SELECT COUNT(*) as result FROM login_details WHERE username = ? AND passw = ?",
    [req.query.username, req.query.password],
    function (err, result, fields) {
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

app.use("/api/admin/", adminRoutes)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
