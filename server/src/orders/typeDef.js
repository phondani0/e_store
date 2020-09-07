const {
  gql
} = require('apollo-server');

const typeDef = gql `

  type Order {
    id: String!
    customer_name: String!
    customer_email: String!
    cart: Cart
    user: User
    updated_at: String!
    created_at: String!
  }

  type ListOrderMetadata {
      count: Int!
  }

  input createOrderInput {
    customer_name: String!
    customer_email: String!
    cart_id: String!
    user_id: String!
      
  }

  extend type Query {

    Order(id: String!): Order!

    allOrders(page: Int, perPage: Int, sortField: String, sortOrder: String):[Order]!

    _allOrdersMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListOrderMetadata!
  }



  extend type Mutation {
    createOrder(data: createOrderInput): Order!,
    
    updateOrder(
      id: String!
      customer_name: String
      customer_email: String
      cart_id: String!
    ): Order!
    
    deleteOrder(id: String!): Order!
  }
`;

module.exports = {
  typeDef
}