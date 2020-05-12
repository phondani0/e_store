const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
  },
  hashed_password: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.methods.generateHash = function (password) {
  try {
    if (!password) throw new Error("Invalid password");
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  } catch (err) {
    return new Error(err.message);
  }
}

userSchema.methods.isValidPassword = function (password) {

  try {
    if (!password) throw new Error("Invalid password");
    return bcrypt.compareSync(password, this.hashed_password);
  } catch (err) {
    return new Error(err.message);
  }
}

module.exports = mongoose.model('User', userSchema, 'users')