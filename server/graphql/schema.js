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
    User(id: ID!): User

    allUsers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter):[User]

    _allUsersMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter): ListMetadata
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!,
    
    updateUser(
      id: ID!
      first_name: String!
      last_name: String!
      email: String!
      mobile: Int
    ): User!

    deleteUser(id: ID!): User!
  }

  schema {
    query: RootQuery

    mutation: RootMutation
  }
  input PostFilter {
    q: String
    id: ID
    title: String
    views: Int
    views_lt: Int
    views_lte: Int
    views_gt: Int
    views_gte: Int
    user_id: ID
}

  type ListMetadata {
      count: Int
  }
  
  scalar Date
`);