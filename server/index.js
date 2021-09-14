const express = require("express")
const path = require("path")

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, "../client/build")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
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
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
