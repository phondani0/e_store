const validator = require('validator');
const jwt = require('jsonwebtoken');
const {
  jwt_secret
} = require('../config/index');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    User: async (parent, args, {
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

      let user = await prisma.user.findOne({
        where: {
          id: args.id
        },
        include: {
          address: true
        }
      });

      console.log(user)
      if (!user) {
        const error = new Error("User does not exists!");
        error.status = 404;
        throw error;
      }

      return user;
    },
    allUsers: async (parent, args, {
      prisma
    }, info) => {

      const {
        page,
        perPage,
        sortField,
        sortOrder,
        filter
      } = args;

      console.log(filter);

      const users = await prisma.user.findMany({
        include: {
          address: true
        }
      });

      if (!users) {
        const error = new Error("User does not exists!");
        error.status = 404;
        throw error;
      }

      return users;
    },
    _allUsersMeta: async (parent, args, {
      prisma
    }) => {

      const {
        page,
        perPage,
        sortField,
        sortOrder,
        filter
      } = args;

      const count = await prisma.user.count();
      // console.log(count);

      return {
        count
      };
    },
    login: async (parent, args, {
      prisma
    }) => {

      const {
        email,
        password
      } = args;

      console.log(args)

      let user = await prisma.user.findOne({
        where: {
          email
        }
      })

      console.log(email)

      if (!user) {
        const error = new Error("User not found.");
        error.status = 401;
        throw error;
      }
      console.log(user)

      const isValid = bcrypt.compareSync(password, user.hashed_password);

      if (!isValid) {
        const error = new Error("Incorrect password.");
        error.status = 401;
        throw error;
      }

      const token = jwt.sign({
        userId: user._id,
        email: user.email
      }, jwt_secret, {
        expiresIn: '1h'
      });

      return {
        token,
        user
      }
    }
  },
  Mutation: {
    createUser: async (parent, args, {
      prisma
    }, info) => {
      const errors = [];

      console.log(args)
      // console.log(info)

      const {
        first_name,
        last_name,
        email,
        password,
        mobile,
        address
      } = args.data;

      if (!validator.isEmail(email)) {
        errors.push({
          message: 'E-mail is invalid.'
        });
      }
      console.log(typeof (mobile) === "string")

      if (typeof (mobile) == "string" && (!validator.isInt(mobile) || !validator.isLength(mobile, {
          min: 10,
          max: 10
        }))) {
        errors.push({
          message: 'Mobile is invalid.'
        });
      }

      if (!typeof (password) == "string" || !validator.isLength(password, {
          min: 5
        })) {
        errors.push({
          message: "Password too short."
        })
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      const user = await prisma.user.findOne({
        where: {
          email: email
        }
      });

      if (user) {
        const error = new Error("User already exists!");
        error.status = 422;
        throw error;
      }

      const newUser = {};

      newUser.first_name = first_name;
      newUser.last_name = last_name;
      newUser.email = email;

      console.log(mobile)
      if (mobile)
        newUser.mobile = mobile;

      let hashedPassword;
      try {
        hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
      } catch (err) {
        console.log(err);
        throw err;
      }

      newUser.hashed_password = hashedPassword;

      const createdUser = await prisma.user.create({
        data: {
          ...newUser,
          address: address ? {
            create: {
              ...address
            }
          } : null
        },
      });
      console.log(createdUser)
      return createdUser
    },
    updateUser: async (parent, args, {
      prisma
    }) => {
      const errors = [];
      console.log(args)
      const {
        id,
        first_name,
        last_name,
        email,
        mobile,
        address
      } = args.data;

      if (typeof (mobile) === "string" && (!validator.isInt(mobile) || !validator.isLength(mobile, {
          min: 10,
          max: 10
        }))) {
        errors.push({
          message: 'mobile is invalid.'
        });
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      let user = {};

      if (first_name)
        user.first_name = first_name;
      if (last_name)
        user.last_name = last_name;
      if (email)
        user.email = email;
      if (mobile)
        user.mobile = mobile;

      console.log(address)

      let addressOperation;

      if (address && address.length > 0) {

        let update = [];
        let create = [];
        address.forEach((data) => {
          if (typeof (data.id) === "string") {
            update.push({
              data: data,
              where: {
                id: data.id
              }
            })
          } else {
            create.push(data);
          }
        });

        addressOperation = {
          create: create,
          update: update
        }
      } else {
        addressOperation = []
      }

      console.log(addressOperation);

      const updatedUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          ...user,
          address: addressOperation
        },
        include: {
          address: true
        }
      });
      console.log(updatedUser);
      return updatedUser;
    },
    deleteUser: async (parent, {
      id
    }, {
      prisma
    }) => {
      const errors = [];

      if (!id || typeof (id) !== "string") {
        errors.push({
          message: 'id is required.'
        });
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input.");
        error.data = errors;
        error.status = 422;
        throw error;
      }

      const user = await prisma.user.delete({
        where: {
          id
        }
      });

      if (!user) {
        const error = new Error("Unable to delete user!");
        error.status = 404;
        throw error;
      }

      return user;
    },
  }
}

module.exports = {
  resolvers
}