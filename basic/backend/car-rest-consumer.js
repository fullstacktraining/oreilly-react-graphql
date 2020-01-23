const { RESTDataSource } = require('apollo-datasource-rest');

class CarAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/api';
    // this.baseURL = 'https://api-gzwsfutmow.now.sh/api';
  }

  async getCars() {
    // HTTP GET http://localhost:3000/api/cars
    const response = await this.get('cars');
    return Array.isArray(response) ? response.map(car => this.carReducer(car)) : [];
  }

  async getCar({ id }) {
    const response = await this.get(`cars/${id}`);
    return this.carReducer(response[0]);
  }

  carReducer(car) {
    return {
      id: car.id || 0,
      cursor: `${car.id}`,
      make: car.make,
      model: car.model,
      year: car.year || 0,
      colour: car.colour,
      speed: car.max_speed || 0
    }
  }
}

module.exports = CarAPI;