const rzpConfig = require('../config/razorpay');
const crypto = require("crypto");

const resolvers = {
  Query: {
    Order: async (parent, args, {
      prisma
    }) => {
      const errors = [];

      console.log("working....", args.id);

      if (!args.id || typeof (args.id) !== "string") {
        errors.push({
          message: "Invalid id."
        });
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      let order = await prisma.order.findOne({
        where: {
          id: args.id
        },
        include: {
          cart: true,
          user: true
        }
      });

      console.log(order)
      if (!order) {
        const error = new Error("Order does not exists!");
        error.status = 404;
        throw error;
      }

      return order;
    },
    allOrders: async (parent, args, {
      prisma
    }, info) => {

      // const {
      //   page,
      //   perPage,
      //   sortField,
      //   sortOrder,
      //   filter
      // } = args;

      const orders = await prisma.order.findMany({
        include: {
          cart: {
            product: true
          },
          user: true
        }
      });

      if (!orders) {
        const error = new Error("Order does not exists!");
        error.status = 404;
        throw error;
      }

      return orders;
    },
    _allOrdersMeta: async (parent, args, {
      prisma
    }) => {

      const {
        page,
        perPage,
        sortField,
        sortOrder,
        filter
      } = args;

      const count = await prisma.order.count();
      // console.log(count);

      return {
        count
      };
    },

  },
  Mutation: {
    createOrder: async (parent, args, {
      prisma,
      user,
      razorpay
    }) => {

      console.log(args);

      const {
        customer_name,
        customer_email,
        user_id,
      } = args.data;

      console.log(user);

      if (user.id != user_id) {
        const error = new Error("Invlid user.");
        console.log(user.id, user_id);
        error.statusCode = 422;
        throw error;
      }

      let cart;
      try {
        cart = await prisma.cart.findMany({
          where: {
            user_id: user.id,
          },
          include: {
            product: true,
          }
        });

        if (!cart || cart.length <= 0) {
          throw new Error();
        }
      } catch (err) {
        const error = new Error("Invalid cart.");
        error.statusCode = 422;
        throw error;
      }

      console.log(cart);

      let cartTotal = 0;

      const cartItems = cart.map((item) => {
        cartTotal += item.quantity * item.product.price
        return {
          id: item.id,
        }
      });

      if (cartTotal <= 0) {
        throw new Error("Cart total should be more than 0");
      }

      const newOrder = {};

      newOrder.customer_name = customer_name;
      newOrder.customer_email = customer_email;
      newOrder.status = "in_progress";

      var options = {
        amount: cartTotal * 100, // convert to paise
        currency: "INR",
      };

      const rzpOrder = await razorpay.orders.create(options);

      console.log(rzpOrder);

      const createdOrder = await prisma.order.create({
        data: {
          ...newOrder,
          user: {
            connect: {
              id: user_id
            }
          },
          cart: {
            connect: cartItems,
          }
        },
        include: {
          cart: {
            include: {
              product: true
            }
          }
        }
      });

      if (!createdOrder)
        throw new Error('Unable to create an order.');

      console.log(createdOrder);
      return {
        ...createdOrder,
        payment: {
          ...rzpOrder,
          key_id: rzpConfig.api_key
        }
      };
    },
    verifyOrder: async (parent, args, {
      prisma,
      user,
      razorpay
    }) => {
      const errors = [];

      console.log(args);

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      if (!user || !user.id) {
        const error = new Error("Invlid user.");
        error.statusCode = 422;
        throw error;
      }

      const generatedSignature = crypto
        .createHmac(
          "SHA256",
          rzpConfig.api_secret
        )
        .update(args.data.payment.razorpay_order_id + "|" + args.data.payment.razorpay_payment_id)
        .digest("hex");

      const isSignatureValid = generatedSignature === args.data.payment.razorpay_signature;

      console.log(generatedSignature, args.data.payment.razorpay_signature);

      if (!isSignatureValid) {
        const error = new Error("Payment failed.");
        error.statusCode = 422;
        throw error;
      }

      const payment = await razorpay.orders.fetchPayments(args.data.payment.razorpay_order_id);

      // TODO: save payment info in db

      console.log(payment.items[0]);

      // TODO: run raw query instead of two queries

      const order = await prisma.order.findOne({
        where: {
          id: args.data.order_id
        },
        include: {
          cart: true
        }
      });


      const cartItemsToUpdate = order.cart.map((item) => {
        return {
          data: {
            status: 'success'
          },
          where: {
            id: item.id,
          }
        }
      });

      console.log(order);

      if (order.user_id != user.id) {
        const error = new Error("Unauthorized user.");
        error.statusCode = 403;
        throw error;
      }

      let updatedOrder = await prisma.order.update({
        where: {
          id: args.data.order_id
        },
        data: {
          status: 'pending',
          cart: {
            update: cartItemsToUpdate,
          }
        },
        include: {
          cart: {
            include: {
              product: true
            }
          }
        }
      });

      console.log(updatedOrder)
      if (!updatedOrder) {
        const error = new Error("Order does not exists!");
        error.status = 404;
        throw error;
      }

      return updatedOrder;
    },
    updateOrder: async (parent, args, {
      prisma
    }) => {
      console.log(args)

      const {
        id,
        customer_name,
        customer_email,
        cart_id,
      } = args;

      if (cart_id) {

        try {
          const cart = await prisma.cart.findOne({
            where: {
              id: cart_id
            }
          });

          if (!cart) {
            throw new Error();
          }

        } catch (err) {
          const error = new Error("Invalid cart id.");
          error.status = 422;
          throw error;
        }
      }

      const order = {};

      if (customer_name)
        order.customer_name = customer_name;

      if (customer_email)
        order.customer_email = customer_email;

      const updatedOrder = await prisma.order.update({
        where: {
          id
        },
        data: {
          ...order,
          cart: {
            connect: {
              id: cart_id
            }
          }
        }
      });

      return updatedOrder;
    },
    deleteOrder: async (parent, {
      id
    }, {
      prisma
    }) => {

      let order;
      try {
        order = await prisma.order.delete({
          where: {
            id
          }
        });

        if (!order) {
          throw new Error();
        }
      } catch (err) {
        const error = new Error("Unable to delete the order!");
        error.status = 500;
        throw error;
      }
      return order;
    },
  }
}

module.exports = {
  resolvers
}