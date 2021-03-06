const mongoose = require('../database/')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  level: {
    type: Number,
  },
  originalLevel: {
    type: Number,
  },
})

const User = mongoose.model('User', UserSchema)
module.exports = User
