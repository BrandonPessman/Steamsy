var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gameSchema = new Schema({
  app_id: String,
  title: String,
  date: { type: Date, default: Date.now }
})

var Game = mongoose.model('Games', gameSchema)
module.exports = Game
