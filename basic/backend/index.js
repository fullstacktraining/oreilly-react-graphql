const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const CarAPI = require('./car-rest-consumer');
const resolvers = require('./resolvers');

const dataSources = () => ({
  carAPI: new CarAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

server.listen().then(({ url }) => {
  console.info(`Server is listening on ${url} 🎉`);
});