const express = require("express");
const res = require("express/lib/response");
const { json } = require("express/lib/response");
const app = express();
const fs = require(`fs`);
app.use(express.json());
const port = process.env.port || 3000;
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

//menampilkan semua data
app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  });
});

// membuat create data
app.post("/api/v1/cars", (req, res) => {
  const newId = cars[cars.length - 1].id + 1;
  const newdata = Object.assign({ id: newId }, req.body);

  cars.push(newdata);
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      message: "200",
      data: {
        car: newdata,
      },
    });
  });
});

// menampilkan data berdasarkan id
app.get("/api/v1/cars/:id", (req, res) => {
  const id = req.params.id;
  const car = cars.find((el) => el.id === id);

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${id} this not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      car,
    },
  });
});

// mengubah data
app.patch(`/api/v1/cars/:id`, (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((el) => el.id === id);

  if (carIndex === -1) {
    return res.status(404).json({
      status: `failed`,
      message: `data with ${id} this not found`,
    });
  }
  cars[carIndex] = { ...cars[carIndex], ...req.body };

  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: `success`,
      message: `tour with this id ${id}edited`,
      data: {
        car: cars[carIndex],
      },
    });
  });
});

// menghapus data
app.delete(`/api/v1/cars/:id`, (req, res) => {
  const id = req.params.id;

  const carIndex = cars.findIndex((el) => el.id === id);

  if (carIndex === -1) {
    return res.status(404).json({
      status: `failed`,
      message: `data not found`,
    });
  }

  cars.splice(carIndex, 1);

  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: `success`,
      message: "Berhasil Delete Data",
      data: null,
    });
  });
});

app.listen(port, () => {
  console.log(`berjalan di port: ${port}`);
});
