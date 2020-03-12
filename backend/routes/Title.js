const app = require('express').Router()
const gamelist = require('../gamelist')
const FuzzySearch = require('fuzzy-search') // Or: var FuzzySearch = require('fuzzy-search');

app.get('/', (req, res) => {
  res.send(gamelist.gamelist)
})

app.get('/:title', (req, res) => {
  // Logic for finding specific Appid if we have it, otherwise bad request
  let title = req.params.title
  title.replace('+', ' ')
  title.replace('%20', ' ')

  const searcher = new FuzzySearch(gamelist.gamelist, ['title'], {
    sort: true
  })

  const fuzzyResults = searcher.search(title)

  res.send(fuzzyResults)
})

module.exports = app
