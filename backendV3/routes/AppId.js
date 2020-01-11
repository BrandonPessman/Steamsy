const app = require('express').Router()
const gamelist = require('../gamelist')

app.get('/', (req, res) => {
  res.send(gamelist.gamelist)
})

app.get('/:id', (req, res) => {
  // Logic for finding specific Appid if we have it, otherwise bad request
  res.send()
})

module.exports = app
