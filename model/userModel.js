const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    min: 3,
    max: 15,
    unique: [true, 'username is unique'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email is unique'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: '',
  },
});
//Query middlewares
userScheme.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Query Methods

userScheme.methods.correctPassword = async function (
  candidatepassword,
  userpassword,
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};

const User = mongoose.model('User', userScheme);
module.exports = User;
