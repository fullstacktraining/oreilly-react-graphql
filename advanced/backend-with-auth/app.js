require('dotenv').config();
const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const models = require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const jwt = require('jsonwebtoken');
app.use(cors());
app.use(fileUpload());

const getLoggedInUser = req => {
  const token = req.headers['x-auth-token'];
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch(error) {
      throw new Error('Session expired');
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    models,
    secret: process.env.JWT_SECRET,
    me: getLoggedInUser(req)
  })
});
server.applyMiddleware({ app });

app.post('/upload', (req, res) => {
  let uploadedFile = req.files.file;
  const filename = req.files.file.name;
  uploadedFile.mv(`${__dirname}/uploads/${filename}`, error => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json(filename);
  });
});

app.listen(3000, () => console.info('Apollo GraphQL server is running on port 3000'));