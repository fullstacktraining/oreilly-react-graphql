const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const { GraphQLScalarType } = require('graphql');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const createToken = (user, secret, expiresIn) => {
  const { id, name, username, photo } = user;
  return jwt.sign({ id, name, username, photo }, secret, { expiresIn });
}

const resolvers = {
  Query: {
    users: (parent, args, { models }) => {
      return models.User.findAll();
    },
    user: (parent, { id }, { models }) => {
      return models.User.findByPk(id);
    },
    me: (parent, args, { me }) => me
  },
  Mutation: {
    removeUser: (parent, { id }, { models }) => {
      return models.User.destroy({
        where: {
          id
        }
      });
    },
    register: async (parent, { name, username, password }, { models }) => {
     const user = {
        name,
        username,
        password
      };
      const registeredUser = await models.User.create(user);
      try {
        if (typeof registeredUser.id === 'number') {
          return true;
        } else {
          return false;
        }
      } catch(error) {
        throw new Error(error);
      }
    },
    login: async (parent, { username, password }, { models, secret }) => {
      const user = await models.User.findOne({ where: { username }});
      if (!user) {
        throw new Error('User not found');
      }
      const validPassword = await user.validatePassword(password);

      if (!validPassword) {
        throw new Error('Password is incorrect');
      }

      return {
        token: createToken(user, secret, '10m')
      };
    },
    uploadImage: async (parent, { filename }, { models, me }) => {
      if (!me) {
        throw new Error('Not authenticated!');
      }
      const path = require('path');
      const mainDir = path.dirname(require.main.filename);
      filename = `${mainDir}/uploads/${filename}`;
      try {
        const photo = await cloudinary.v2.uploader.upload(filename);
        await models.User.update({
          photo: `${photo.public_id}.${photo.format}`
        }, {
          where: { username: me.username }
        });
        return `${photo.public_id}.${photo.format}`;
      } catch(error) {
        throw new Error(error);
      }
    }
  },
  User: {
    car: (parent, args, { models }) => {
      return models.Car.findAll({
        where: {
          userId: parent.id
        }
      })
    },
    photo: (parent, { options }) => {
      let url = cloudinary.url(parent.photo);
      if (options) {
        const [ width, height, face, radius ] = options;
        const cloudinaryOptions = {
          ...(face && { crop: 'thumb', gravity: 'face' }),
          ...(radius && { radius:`${radius}` }),
          fetch_format: 'auto',
          quality: 'auto',
          width,
          height,
          secure: true
        };
        url = cloudinary.url(parent.photo, cloudinaryOptions);
        return url;
      }
      return url;
    }
  },
  CloudinaryOptions: new GraphQLScalarType({
    name: 'CloudinaryOptions',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return ast.value.split(',');
    }
  })
};

module.exports = resolvers;
