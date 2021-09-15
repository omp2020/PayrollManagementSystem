const express = require("express")
const path = require("path")

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, "../client/build")))

var mysql = require("mysql")

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@sa",
})

con.connect(function (err) {
  if (err) throw err
  console.log("Connected!")
})

app.get("/login", (req, res) => {
  var data = { error: 0 }
  res.send(data)
  console.log(req.query.username)
  console.log(req.query.password)
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
