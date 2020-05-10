const {
  buildSchema
} = require('graphql');

module.exports = buildSchema(`
  type Data {
    text: String!
    views: Int!
  }

  type RootQuery {
    hello: Data!
  }

  schema {
    query: RootQuery
  }
`);