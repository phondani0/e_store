const {
  gql
} = require('apollo-server');

const typeDef = gql `

  type User {
    id: String!
    first_name: String!
    last_name: String!
    email: String!
    mobile:  String
    address: [UserAddress]
    updated_at: String!
    created_at: String!
  }

  type LoginData {
    token: String!
    user: User!
  }
  
  input PostFilter {
    q: String
    id: Int
    title: String
    views: Int
    views_lt: Int
    views_lte: Int
    views_gt: Int
    views_gte: Int
    user_id: ID
  }

  type ListMetadata {
      count: Int!
  }

  type UserAddress {
    id: String!
    area: String
    city: String!
    country: String!
    pincode: Int!
    state: String!
    street: String!
    updated_at: String!
    created_at: String!
  }

  input CreateUserAddressInput {
    area: String
    city: String!
    country: String!
    pincode: Int!
    state: String!
    street: String!
  }

  input CreateUserInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    mobile:  String
    address: CreateUserAddressInput
  }

  extend type Query {
    login(email: String!, password: String!): LoginData!

    User(id: String!): User!

    allUsers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter):[User]

    _allUsersMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter): ListMetadata
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!,
    
    updateUser(
      id: String!
      first_name: String
      last_name: String
      email: String
      mobile:  String
    ): User!
    
    deleteUser(id: String!): User!
  }
`;

module.exports = {
  typeDef
}