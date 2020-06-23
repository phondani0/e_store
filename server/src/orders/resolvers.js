const resolvers = {
  Query: {
    Order: async (parent, args, {
      prisma
    }) => {
      const errors = [];

      console.log("working....", args.id)

      if (!args.id || typeof (args.id) !== "string") {
        errors.push({
          message: "Invalid id."
        })
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
          product: true,
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
          product: true,
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
        product_id,
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

      let product;
      try {
        product = await prisma.product.findOne({
          where: {
            id: product_id
          }
        });

        if (!product) {
          throw new Error();
        }
      } catch (err) {
        const error = new Error("Invalid product_id.");
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
          product: {
            connect: {
              id: product_id
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
        product_id,
      } = args;

      if (product_id) {

        try {
          const product = await prisma.product.findOne({
            where: {
              id: product_id
            }
          });

          if (!product) {
            throw new Error();
          }

        } catch (err) {
          const error = new Error("Invalid product id.");
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
          product: {
            connect: {
              id: product_id
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