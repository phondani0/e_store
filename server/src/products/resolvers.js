const validator = require('validator');
const jwt = require('jsonwebtoken');
const {
  jwt_secret
} = require('../config/index');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    Product: async (parent, args, {
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

      let product = await prisma.product.findOne({
        where: {
          id: args.id
        }
      });

      console.log(product)
      if (!product) {
        const error = new Error("User does not exists!");
        error.status = 404;
        throw error;
      }

      return product;
    },
    allProducts: async (parent, args, {
      prisma
    }, info) => {

      // const {
      //   page,
      //   perPage,
      //   sortField,
      //   sortOrder,
      //   filter
      // } = args;

      const products = await prisma.product.findMany();

      if (!products) {
        const error = new Error("User does not exists!");
        error.status = 404;
        throw error;
      }

      return products;
    },
    _allProductsMeta: async (parent, args, {
      prisma
    }) => {

      const {
        page,
        perPage,
        sortField,
        sortOrder,
        filter
      } = args;

      const count = await prisma.product.count();
      // console.log(count);

      return {
        count
      };
    }
  },
  Mutation: {
    createProduct: async (parent, args, {
      prisma
    }) => {
      const errors = [];

      console.log(args)

      const {
        name,
        description,
        category,
        image,
        price,
        quantity,
      } = args;

      if (!typeof (price) == "number" || price < 0) {
        errors.push({
          message: "price should be greater than zero."
        })
      }

      if (!typeof (quantity) == "number" || quantity < 0) {
        errors.push({
          message: "quantity should be greater than zero."
        })
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      const newProduct = {};

      newProduct.name = name;
      newProduct.description = description;
      newProduct.price = price
      newProduct.quantity = quantity;

      if (category)
        newProduct.category = category;

      const createdProduct = await prisma.product.create({
        data: newProduct
      });

      console.log(createdProduct);

      return createdProduct;
    },
    updateProduct: async (parent, args, {
      prisma
    }) => {
      const errors = [];

      const {
        id,
        name,
        description,
        category,
        image,
        price,
        quantity,
      } = args;

      if (!typeof (price) == "number" || price < 0) {
        errors.push({
          message: "price should be greater than zero."
        })
      }

      if (!typeof (quantity) == "number" || quantity < 0) {
        errors.push({
          message: "quantity should be greater than zero."
        })
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      const product = {};

      if (name)
        product.name = name;
      if (description)
        product.description = description;
      if (category)
        product.category = category;
      if (price)
        product.price = price;
      if (quantity)
        product.quantity = quantity;

      const updatedProduct = await prisma.product.update({
        where: {
          id
        },
        data: product
      });

      return updatedProduct;
    },
    deleteProduct: async (parent, {
      id
    }, {
      prisma
    }) => {

      const product = await prisma.product.delete({
        where: {
          id
        }
      });

      if (!product) {
        const error = new Error("Unable to delete the product!");
        error.status = 404;
        throw error;
      }

      return product;
    },
  }
}

module.exports = {
  resolvers
}