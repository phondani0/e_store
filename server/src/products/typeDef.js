const { gql } = require("graphql-tag");

const typeDef = gql`
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

  input CreateProductInput {
    name: String!
    description: String!
    category: String
    image: String!
    price: Int!
    quantity: Int!
  }

  input UpdateProductInput {
    id: String!
    name: String
    description: String
    category: String
    image: String
    price: Int
    quantity: Int
  }

  type Query {
    Product(id: String!): Product!

    allProducts(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
    ): [Product]!

    _allProductsMeta(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
    ): ListProductMetadata!
  }

  type Mutation {
    createProduct(data: CreateProductInput): Product!

    updateProduct(data: UpdateProductInput): Product!

    deleteProduct(id: String!): Product!
  }
`;

module.exports = {
  typeDef,
};
