const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    min: [8, 'username must be between 8 to 16 letters'],
    max: [16, 'username must be between 8 to 16 letters'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  number: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    required: [true, 'enter password'],
  },
});

const UserModel = mongoose.model('users', userSchema);

module.exports = {
  UserModel: UserModel,
};
