const {
  ApolloServer,
  gql
} = require('apollo-server');

const mongoose = require('mongoose');

const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient();

require('dotenv').config();

// const fs = require('fs');
// const path = require('path');

// // import schema
// const schema = fs.readFileSync(path.join(__dirname, './src/schema.graphql'), 'utf-8');

// const typeDefs = gql `${schema}`;

const users = require('./src/users');

const typeDef = gql `
  type Query
  type Mutation
`;

const {
  mongoUri
} = require('./src/config/db');

const server = new ApolloServer({
  typeDefs: [typeDef, users.typeDef],
  resolvers: [users.resolvers],
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

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("\x1b[32m", `MongoDB connected...`);

    const port = process.env.PORT || 3500;

    server.listen(port).then(({
      url
    }) => {
      console.log("\x1b[32m", `Server started at ${url}`, "\x1b[0m");
    });

  })
  .catch(err => {
    console.log("\x1b[31m", "MongoDB connection error:", err.message, "\x1b[0m");
  });