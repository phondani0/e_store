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
    updated_at: String!
    created_at: String!
  }

  type ListProductMetadata {
      count: Int!
  }

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
      name: String
      description: String
      category: String
      image: String
      price: Int
      quantity: Int
    ): Product!
    
    deleteProduct(id: String!): Product!
  }
`;

module.exports = {
  typeDef
}