const {
  gql
} = require('apollo-server');

const typeDef = gql `

  type Order {
    id: String!
    customer_name: String!
    customer_email: String!
    product_id: String!
    user_id: String!
    updated_at: String!
    created_at: String!
  }

  type ListOrderMetadata {
      count: Int!
  }

  extend type Query {

    Order(id: String!): Order!

    allOrders(page: Int, perPage: Int, sortField: String, sortOrder: String):[Order]!

    _allOrdersMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListOrderMetadata!
  }

  extend type Mutation {
    createOrder(   
      customer_name: String!
      customer_email: String!
      product_id: String!
      user_id: String!
    ): Order!,
    
    updateOrder(
      id: String!
      customer_name: String
      customer_email: String
      product_id: String!
    ): Order!
    
    deleteOrder(id: String!): Order!
  }
`;

module.exports = {
  typeDef
}