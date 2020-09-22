const {
  gql
} = require('apollo-server');

const typeDef = gql `

  type Order {
    id: String!
    customer_name: String!
    customer_email: String!
    cart: [Cart]
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
    user_id: String!
      
  }

  type Payment {
    id: String!
    key_id: String!
    entity: String!
    amount: Int!
    amount_paid: Int!
    amount_due: Int!
    currency:  String!
    receipt: String
    offer_id: String,
    status: String!
    attempts:  Int,
    created_at: Int
  }

  type CreateOrderResponse {
    id: String!
    customer_name: String!
    customer_email: String!
    cart: [Cart]
    user: User
    payment: Payment
    updated_at: String!
    created_at: String!
  }

  input PaymentResponse {
    razorpay_order_id: String!
    razorpay_payment_id: String!
    razorpay_signature: String!
  }

  input VerifyOrderInput {
    order_id: String!
    payment: PaymentResponse
  }

  type VerifyOrderResponse {
    id: String!
    customer_name: String!
    customer_email: String!
    cart: [Cart]
    user: User
    payment: Payment
    updated_at: String!
    created_at: String!
  }

  extend type Query {

    Order(id: String!): Order!

    allOrders(page: Int, perPage: Int, sortField: String, sortOrder: String):[Order]!

    _allOrdersMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListOrderMetadata!
  }

  extend type Mutation {
    createOrder(data: createOrderInput): CreateOrderResponse!,

    verifyOrder(data: VerifyOrderInput): VerifyOrderResponse!
    
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