const {
  gql
} = require('apollo-server');

const typeDef = gql`

  type Cart {
    id: String!
    quantity: Int!
    products: [Product]!
    status: OrderStatus!
    updated_at: String!
    created_at: String!
  }

  type ListCartMetadata {
      count: Int!
  }

  enum OrderStatus {
    cancelled
    delivered
    draft
    failed
    in_progress
    on_hold
    pending
    refunded
    return_to_seller
    returned
    shipped
  }

  extend type Query {

    Cart(id: String!): Cart!

    fetchCart(userId: String!): Cart!

    allCarts(page: Int, perPage: Int, sortField: String, sortOrder: String):[Cart]!

    _allCartsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListCartMetadata!
  }

  extend type Mutation {
    createCart(   
      customer_name: String!
      customer_email: String!
      cart_id: String!
      user_id: String!
    ): Cart!,
    
    updateCart(
      id: String!
      customer_name: String
      customer_email: String
      cart_id: String!
    ): Cart!
    
    deleteCart(id: String!): Cart!
  }
`;

module.exports = {
  typeDef
}