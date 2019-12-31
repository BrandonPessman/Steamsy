var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  date: { type: Date, default: Date.now },
  points: Number
})

var User = mongoose.model('Users', userSchema)
module.exports = User
