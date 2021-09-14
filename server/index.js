const express = require("express")
const path = require("path")

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, "../client/build")))

app.get("/api", (req, res) => {
  var Connection = require("tedious").Connection
  var config = {
    server: "localhost",
    authentication: {
      type: "default",
      options: {
        userName: "sa",
        password: "admin@sa",
      },
    },
    options: {
      encrypt: true,
      database: "ERP",
    },
  }
  var connection = new Connection(config)
  connection.on("connect", function (err) {
    if (err) {
      console.log("ERROR: ", err)
    } else {
      console.log("Connected")
      executeStatement()
    }
  })

  connection.connect()
  var Request = require("tedious").Request
  var TYPES = require("tedious").TYPES

  function executeStatement() {
    let sql =
      "SELECT * FROM [User] WHERE username = '" +
      req.query.username +
      "' AND password = '" +
      req.query.password +
      "'"
    request = new Request(sql, function (err, rowCount) {
      if (err) {
        console.log(err)
        res.json({ error: "1" })
      } else {
        if (rowCount) {
          res.json({ error: "0" })
        } else {
          res.json({ error: "1" })
        }
      }
    })
    // var result = ""
    // request.on("row", function (columns) {
    //   columns.forEach(function (column) {
    //     if (column.value === null) {
    //       console.log("NULL")
    //     } else {
    //       result += column.value + " "
    //     }
    //   })
    //   console.log(result)
    //   res.json({ error: "0" })
    //   result = ""
    // })

    request.on("done", function (rowCount, more) {
      console.log(rowCount + " rows returned")
    })
    request.on("requestCompleted", function (rowCount, more) {
      connection.close()
    })
    connection.execSql(request)
  }
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
