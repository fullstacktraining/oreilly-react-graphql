const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  cars(pageSize: Int, after: String): CarConnection!
  car(id: ID!): Car
}

type CarConnection {
  cursor: String!
  hasMore: Boolean!
  cars: [Car]!
}

type Car {
  id: ID!
  make: String
  model: String
  year: Int
  colour: String
  speed: Int
}
`

module.exports = typeDefs;


// cars: [Car]


// type CarConnection {
//   cursor: String!
//   hasMore: Boolean!
//   cars: [Car]!
// }



// cars(pageSize: Int, after: String): CarConnection! 
//cars(pageSize: Int, after: String): CarConnection! 