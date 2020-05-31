const User = require('../models/User');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {
  jwt_secret
} = require('../config/index');

const resolvers = {
  Query: {
    User: async (parent, args) => {
      const errors = [];

      console.log("working....", args.id)

      if (validator.isEmpty(args.id)) {
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

      let user;
      try {
        user = await User.findById(args.id);
      } catch (err) {
        console.log("error.. ", err);
        const error = new Error("Unable to get user!");
        error.status = 500;
        throw error;
      }

      if (!user) {
        const error = new Error("User does not exists!");
        error.status = 404;
        throw error;
      }

      return {
        id: user._id,
        ...user._doc,
      }
    },
    allUsers: async () => {

      // const {
      //   page,
      //   perPage,
      //   sortField,
      //   sortOrder,
      //   filter
      // } = args;

      const users = await User.find({}).limit(50);

      if (!users) {
        const error = new Error("User does not exists!");
        error.status = 404;
        throw error;
      }

      return users.map(user => {
        return {
          id: user._id.toString(),
          ...user._doc,
        }
      });
    },
    _allUsersMeta: async (parent, args) => {

      const {
        page,
        perPage,
        sortField,
        sortOrder,
        filter
      } = args;

      console.log(page, perPage, sortField, sortOrder, filter);

      const users = await User.find({}).limit(50);

      if (!users) {
        const error = new Error("User does not exists!");
        error.status = 404;
        throw error;
      }
      console.log(users.length);
      return {
        count: users.length
      };
    },
    login: async (parent, args) => {

      const {
        email,
        password
      } = args;

      console.log(args)

      let user;
      try {
        user = await User.findOne({
          email: email
        });
      } catch (err) {
        console.log(err)
        throw err;
      }

      console.log(email)

      if (!user) {
        const error = new Error("User not found.");
        error.status = 401;
        throw error;
      }

      const isValid = user.isValidPassword(password);

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
        userId: user._id.toString()
      }
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const errors = [];

      console.log(args)

      const {
        first_name,
        last_name,
        email,
        password,
        mobile
      } = args;

      if (!validator.isEmail(email)) {
        errors.push({
          message: 'E-mail is invalid.'
        });
      }
      console.log(typeof (mobile))
      if (typeof (mobile) !== "string" || !validator.isInt(mobile) || !validator.isLength(mobile, {
          min: 10,
          max: 10
        })) {
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

      const user = await User.findOne({
        email: email
      });

      if (user) {
        const error = new Error("User already exists!");
        error.status = 422;
        throw error;
      }

      const newUser = new User();

      newUser.first_name = first_name;
      newUser.last_name = last_name;
      newUser.email = email;

      if (+mobile)
        newUser.mobile = +mobile;

      let hashedPassword;
      try {
        hashedPassword = newUser.generateHash(password);
      } catch (err) {
        console.log(err);
        throw err;
      }

      newUser.hashed_password = hashedPassword;

      const createdUser = await newUser.save();

      return {
        id: createdUser._id.toString(),
        ...createdUser._doc,
      }
    },
    updateUser: async (parent, {
      id,
      first_name,
      last_name,
      email,
      mobile
    }) => {
      const errors = [];

      if (!validator.isEmail(email)) {
        errors.push({
          message: 'E-mail is invalid.'
        });
      }

      if (typeof (mobile) == "string" || !validator.isInt(mobile) || !validator.isLength(mobile, {
          min: 10,
          max: 10
        })) {
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
      let user;

      try {
        user = await User.findById(id);
      } catch (err) {
        console.log(err);
        throw err;
      }

      if (!user) {
        const error = new Error("User does not exists!");
        error.status = 422;
        throw error;
      }

      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.mobile = +mobile;

      const updatedUser = await user.save();

      return {
        id: updatedUser._id.toString(),
        ...updatedUser._doc,
      }
    },
    deleteUser: async (parent, {
      id
    }) => {
      const errors = [];

      if (validator.isEmpty(id)) {
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

      const user = await User.findOneAndDelete({
        _id: id
      });

      if (!user) {
        const error = new Error("Unable to delete user!");
        error.status = 404;
        throw error;
      }

      return {
        id: user._id.toString,
        ...user._doc,
      }
    },
  }
}

module.exports = {
  resolvers
}