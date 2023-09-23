const express = require("express")
const carController = require("../controller/carController")

const router = express.Router()

router.param("id", carController.checkId)

router
  .route("/")
  .get(carController.getAllCars)
  .post(carController.createCars)

router
  .route("/:id")
  .get(carController.getCarsById)
  .patch(carController.editCars)
  .delete(carController.deleteCars)

module.exports = router
