const User = require('../models/User');

module.exports = {
  hello() {
    return {
      text: "Hello World!!",
      views: 2000
    }
  },
  // if not using async await always return promise or graphql will not wait for createuser function to execute
  createUser: async ({
    userInput
  }, req) => {
    const user = await User.findOne({
      email: userInput.email
    });

    if (user) {
      const error = new Error("User already exists!");
      throw error;
    }

    const newUser = new User({
      first_name: userInput.first_name,
      last_name: userInput.last_name,
      email: userInput.email,
      mobile: userInput.mobile
    })

    let hashedPassword;
    try {
      hashedPassword = newUser.generateHash(userInput.password);
    } catch (err) {
      throw err;
    }

    newUser.hashed_password = hashedPassword;

    const createdUser = await newUser.save();

    return {
      _id: createdUser._id.toString(),
      ...createdUser._doc,
    }
  }
}