const {
  gql
} = require('apollo-server');

const typeDef = gql `

  type Cart {
    id: String!
    quantity: Int!
    product: Product!
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
    fetchCart: [Cart]!
  }

  extend type Mutation {
    addToCart(productId: String!, quantity: Int): Cart!

    editCart(cartId: String!, quantity: Int): Cart!

    removeFromCart(cartId: String!): Cart!
  }
`;

module.exports = {
  typeDef
}