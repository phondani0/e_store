const {
  ApolloServer,
  gql
} = require('apollo-server');

require('dotenv').config();


const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient();

const users = require('./src/users');
const products = require('./src/products');

const typeDef = gql `
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [
    typeDef,
    users.typeDef,
    products.typeDef
  ],
  resolvers: [
    users.resolvers,
    products.resolvers
  ],
  context: {
    prisma
  },
  formatError: (error) => {
    if (error.originalError) {
      console.log(error)
      const data = error.originalError.data;
      const message = error.message || "An error occurred.";
      const status = error.originalError.status || 500;
      return {
        data,
        message,
        status
      };
    }
    return error
  }
});

const port = process.env.PORT || 3500;

server.listen(port).then(({
  url
}) => {
  console.log("\x1b[32m", `Server started at ${url}`, "\x1b[0m");
});