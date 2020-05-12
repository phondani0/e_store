const {
  buildSchema
} = require('graphql');

module.exports = buildSchema(`

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

  type LoginData {
    token: String!
    userId: String
  }
  
  type RootQuery {
    login(email: String!, password: String!): LoginData!
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
  }

  schema {
    query: RootQuery

    mutation: RootMutation
  }
`);