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

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }

  next();
});

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
  customFormatErrorFn: (error) => {
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
}))


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({
    message,
    data
  });
});


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