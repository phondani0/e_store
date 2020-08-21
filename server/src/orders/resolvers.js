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
    }
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