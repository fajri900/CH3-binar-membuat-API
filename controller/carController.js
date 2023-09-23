const fs = require("fs")

const cars = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../data/cars.json`
  )
)

const checkId = (req, res, next, val) => {
  console.log(val)
  const car = cars.find((el) => el.id === val)

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${val} this not found`,
    })
  }
  next()
}

const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
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
        message: "201",
        data: {
          car: cars,
        },
      })
    }
  )
}

const getCarsById = (req, res) => {
  const id = req.params.id
  const car = cars.find((el) => el.id === id)

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
        message: `car with this id ${id}edited`,
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

module.exports = {
  getAllCars,
  createCars,
  getCarsById,
  editCars,
  deleteCars,
  checkId,
}
