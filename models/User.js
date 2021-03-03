const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
  }
})

module.exports = mongoose.model('users', userSchema)