const app = require('express').Router()
const gamelist = require('../gamelist')

app.get('/', (req, res) => {
  res.send(gamelist.gamelist)
})

app.get('/:id', (req, res) => {
  res.send()
})

module.exports = app
