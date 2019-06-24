const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cars = require('./cars');
const REST_PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/cars', async (_, res) => {
  res.status(200).json(cars);
});
app.get('/api/cars/:id', async (req, res) => {
  const id = +req.params.id;
  const car = cars.filter(car => car.id === id);
  return res.status(200).json(car);
});

app.listen(REST_PORT, () => console.info(`Server is listening on ${REST_PORT} 🎉`));