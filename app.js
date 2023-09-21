const express = require("express")
const res = require("express/lib/response")
const { json } = require("express/lib/response")
const app = express()
const fs = require(`fs`)
app.use(express.json())
const port = process.env.port || 3000
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/data/cars.json`)
)

const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  })
}

const createCars = (req, res) => {
  const newId = cars[cars.length - 1].id + 1
  const newdata = Object.assign(
    { id: newId },
    req.body
  )

  cars.push(newdata)
  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        message: "200",
        data: {
          car: newdata,
        },
      })
    }
  )
}

const getCarsById = (req, res) => {
  const id = req.params.id
  const car = cars.find((el) => el.id === id)

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    })
  }

  res.status(200).json({
    status: "success",
    data: {
      car,
    },
  })
}

const editCars = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

  if (carIndex === -1) {
    return res.status(404).json({
      status: `failed`,
      message: `data with ${id} this not found`,
    })
  }
  cars[carIndex] = {
    ...cars[carIndex],
    ...req.body,
  }

  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: `success`,
        message: `tour with this id ${id}edited`,
        data: {
          car: cars[carIndex],
        },
      })
    }
  )
}

const deleteCars = (req, res) => {
  const id = req.params.id

  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

  if (carIndex === -1) {
    return res.status(404).json({
      status: `failed`,
      message: `data not found`,
    })
  }

  cars.splice(carIndex, 1)

  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: `success`,
        message: "Berhasil Delete Data",
        data: null,
      })
    }
  )
}

// ===============================================

const carRouter = express.Router()

carRouter
  .route("/")
  .get(getAllCars)
  .post(createCars)

carRouter
  .route("/:id")
  .get(getCarsById)
  .patch(editCars)
  .delete(deleteCars)

app.use("/api/v1/cars", carRouter)

app.listen(port, () => {
  console.log(`berjalan di port: ${port}`)
})
