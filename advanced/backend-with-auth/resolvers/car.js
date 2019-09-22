const resolvers = {
  Query: {
    cars: (parent, args, { models }) => {
      // SELECT * FROM cars;
      return models.Car.findAll();
    },
    car: (parent, { id }, { models }) => {
      // SELECT * FROM cars WHERE id = `id`;
      return models.Car.findByPk(id);
    }
  },
  Mutation: {
    createCar: (parent, { make, model, colour }, { models, me }) => {
      if (!me) {
        throw new Error('Not authenticated');
      }

      const car = {
        make,
        model,
        colour,
        userId: me.id
      };
      
      return models.Car.create(car);
    },
    removeCar: (parent, { id }, { models }) => {
      return models.Car.destory({
        where: {
          id
        }
      });
    }
  },
  Car: {
    owner: (parent, args, { models }) => {
      console.log(parent);
      // SELECT * FROM users WHERE id = `parent.userId`;
      return models.User.findByPk(parent.userId);
    }
  }
};

module.exports = resolvers;