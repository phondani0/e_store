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
    editCart: async (parent, args, {
      prisma,
      user
    }) => {
      if (!user) {
        throw new Error('Invalid user.');
      }

      console.log(args);

      const {
        cartId,
        quantity
      } = args;

      try {

        const cart = await prisma.cart.findOne({
          where: {
            id: cartId
          },
          include: {
            user: true
          }
        });

        if (!cart || user.id !== cart.user.id) {
          const error = new Error('Invalid cartId.');
          error.status = 422;
          throw error;
        }
        console.log(cartId)
        const updatedCart = await prisma.cart.update({
          where: {
            id: cartId,
          },
          data: {
            quantity: quantity
          },
          include: {
            product: true
          }
        });

        console.log(updatedCart);

        return updatedCart;

      } catch (err) {
        console.log(err);
        if (err.status !== 500) {
          throw err;
        }
        const error = new Error("Unable to edit to the cart");
        error.status = 500;
        throw error;
      }
    },
    removeFromCart: async (parent, {
      cartId
    }, {
      prisma,
      user
    }) => {

      if (!user) {
        throw new Error('Invalid user.');
      }

      try {

        const cart = await prisma.cart.findOne({
          where: {
            id: cartId
          },
          include: {
            user: true
          }
        });

        if (!cart || user.id !== cart.user.id) {
          const error = new Error('Invalid cartId.');
          error.status = 422;
          throw error;
        }
        console.log(cartId)

        const deletedCart = await prisma.cart.delete({
          where: {
            id: cartId
          }
        });

        if (!deletedCart) {
          throw new Error('Cart not deleted.').status = 404;
        }

        return deletedCart;
      } catch (err) {
        if (err.status !== 500)
          throw err;
        const error = new Error("Unable to delete the cart!");
        error.status = 500;
        throw error;
      }
    },
  }
}

module.exports = {
  resolvers
}