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

  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    mobile: Int
    created_at: String!
    updated_at: String! 
  }

  input UserInputData {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    mobile: Int
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
  }

  schema {
    query: RootQuery

    mutation: RootMutation
  }
`);