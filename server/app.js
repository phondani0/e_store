const {
  ApolloServer,
  gql
} = require('apollo-server');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient();

const users = require('./src/users');
const products = require('./src/products');
const orders = require('./src/orders');
const cart = require('./src/cart');

const {
  jwt_secret
} = require('./src/config/index');

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, jwt_secret)
    }
    return null;
  } catch (err) {
    return null;
  }
}

const typeDef = gql `
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [
    typeDef,
    users.typeDef,
    products.typeDef,
    orders.typeDef,
    cart.typeDef
  ],
  resolvers: [
    users.resolvers,
    products.resolvers,
    orders.resolvers,
    cart.resolvers
  ],
  context: ({
    req
  }) => {

    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token)

    return {
      prisma,
      user
    }
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
  },
  formatResponse: (data) => {
    console.log('Response: ', data);

    return data;
  }
});

const port = process.env.PORT || 3500;

server.listen(port).then(({
  url
}) => {
  console.log("\x1b[32m", `Server started at ${url}`, "\x1b[0m");
});