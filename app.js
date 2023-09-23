const fs = require("fs")

const express = require("express")
const morgan = require("morgan")

const carRouter = require("./routes/carRoutes")

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

app.use("/api/v1/cars", carRouter)

module.exports = app
