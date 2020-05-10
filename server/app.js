const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const {
  mongoUri
} = require('./config/db');

const app = express();


app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers
}))




const port = process.env.PORT || 3500;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("\x1b[32m", `MongoDB connected...`);
    app.listen(3500, () => {
      console.log("\x1b[32m", `Server started at port ${port}...`, "\x1b[0m");
    });
  })
  .catch(err => {
    console.log("\x1b[31m", "MongoDB connection error:", err.message, "\x1b[0m");
  });