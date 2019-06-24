const car = (sequelize, DataTypes) => {
  const Car = sequelize.define('car', {
    make: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
    colour: {
      type: DataTypes.STRING
    }
  });

  Car.associate = models => {
    Car.belongsTo(models.User);
  };

  return Car;
}

module.exports = car;