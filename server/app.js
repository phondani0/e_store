const {
  ApolloServer
} = require('apollo-server');

const {
  connect
} = require('mongoose');

require('dotenv').config();

const {
  typeDefs
} = require('./graphql/schema');

const {
  resolvers
} = require('./graphql/resolvers');

// const {
//   mongoUri
// } = require('./config/db');

// connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("\x1b[32m", `MongoDB connected...`);
//     app.listen(3500, () => {
//       console.log("\x1b[32m", `Server started at port ${port}...`, "\x1b[0m");
//     });
//   })
//   .catch(err => {
//     console.log("\x1b[31m", "MongoDB connection error:", err.message, "\x1b[0m");
//   });



const server = new ApolloServer({
  typeDefs,
  resolvers,
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