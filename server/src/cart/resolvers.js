const resolvers = {
  Query: {
    fetchCart: async (parent, args, {
      prisma
    }) => {
      const errors = [];

      console.log("working....", args.id)

      if (!args.userId || typeof (args.userId) !== "string") {
        errors.push({
          message: "Invalid userId."
        })
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      let cart = await prisma.cart.findOne({
        where: {
          user_id: args.userId,
        },
        include: {
          product: true,
        }
      });

      console.log(cart)
      if (!cart) {
        const error = new Error("cart does not exists!");
        error.status = 404;
        throw error;
      }

      return cart;
    },
  },
  Mutation: {
    createOrder: async (parent, args, {
      prisma
    }) => {

      console.log(args)

      const {
        customer_name,
        customer_email,
        cart_id,
        user_id,
      } = args;

      let user;
      try {
        user = await prisma.user.findOne({
          where: {
            id: user_id
          }
        });

        if (!user) {
          throw new Error();
        }
      } catch (err) {
        const error = new Error("Invlid user_id.");
        error.status = 404;
        throw error;
      }

      let cart;
      try {
        cart = await prisma.cart.findOne({
          where: {
            id: cart_id
          }
        });

        if (!cart) {
          throw new Error();
        }
      } catch (err) {
        const error = new Error("Invalid cart_id.");
        error.status = 422;
        throw error;
      }

      const newOrder = {};

      newOrder.customer_name = customer_name;
      newOrder.customer_email = customer_email;

      const createdOrder = await prisma.order.create({
        data: {
          ...newOrder,
          user: {
            connect: {
              id: user_id
            }
          },
          cart: {
            connect: {
              id: cart_id
            }
          }
        }
      });

      console.log(createdOrder);

      return createdOrder;
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
        error.status = 404;
        throw error;
      }
      return order;
    },
  }
}

module.exports = {
  resolvers
}