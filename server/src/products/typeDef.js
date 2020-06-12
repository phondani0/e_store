const {
  gql
} = require('apollo-server');

const typeDef = gql `

  type Product {
    id: String!
    name: String!
    image: String
    quantity: Int!
    category: String
    description: String!
    price: Int!
    updated_at: String
    created_at: String
  }

  # input PostFilter {
  #   q: String
  #   id: Int
  #   title: String
  #   views: Int
  #   views_lt: Int
  #   views_lte: Int
  #   views_gt: Int
  #   views_gte: Int
  #   user_id: ID
  # }

  type ListProductMetadata {
      count: Int
  }

  # input CreateUserInput {
  #   first_name: String!
  #   last_name: String!
  #   email: String!
  #   password: String!
  #   mobile:  String
  # }

  extend type Query {

    Product(id: String!): Product!

    allProducts(page: Int, perPage: Int, sortField: String, sortOrder: String):[Product]!

    _allProductsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListProductMetadata!
  }

  extend type Mutation {
    createProduct(   
      name: String!
      description: String!
      category: String
      image: String
      price: Int!
      quantity: Int!
    ): Product!,
    
    updateProduct(
      id: String!
      name: String!
      description: String!
      category: String
      image: String
      price: Int!
      quantity: Int!
    ): Product!
    
    deleteProduct(id: String!): Product!
  }
`;

module.exports = {
  typeDef
}