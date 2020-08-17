const resolvers = {
  Query: {
    fetchCart: async (parent, args, {
      prisma,
      user
    }) => {

      const errors = [];

      console.log("working....", args.id)

      if (!user) {
        throw new Error('Invalid user.');
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      let cart = await prisma.cart.findMany({
        where: {
          user_id: user.id,
        },
        include: {
          product: true,
        }
      });

      console.log(cart);
      if (!cart) {
        const error = new Error("cart does not exists!");
        error.status = 404;
        throw error;
      }

      return cart;
    },
  },
  Mutation: {
    addToCart: async (parent, args, {
      prisma,
      user
    }) => {

      if (!user) {
        throw new Error('Invalid user.');
      }

      console.log(args);

      const {
        productId,
        quantity
      } = args;

      try {

        const cart = await prisma.cart.create({
          data: {
            quantity: quantity,
            user: {
              connect: {
                id: user.id
              }
            },
            product: {
              connect: {
                id: productId
              }
            },
            status: 'draft'
          },
          include: {
            product: true
          }
        });

        console.log(cart);

        return cart;

      } catch (err) {
        console.log(err);
        const error = new Error("Unable to add to the cart");
        error.status = 500;
        throw error;
      }
    },
  }
}

module.exports = {
  resolvers
}