const express = require('express')
const router = express.Router()
const MongoDB = require('../scripts/mongoUtil')
const GamesList = require('../scripts/gamesListUtil')

const FuzzySearch = require('fuzzy-search') // Or: var FuzzySearch = require('fuzzy-search');

router.get('/search/:gameName', (req, res) => {
  const db = MongoDB.getDatabase()
  const name = req.params.gameName

  const searcher = new FuzzySearch(GamesList.getListOfGames(), ['title'], {
    sort: true,
  })
  const fuzzyResults = searcher.search(name)

  res.status(200).json({ data: fuzzyResults })
})

router.get('/id/:gameId', (req, res) => {
  const db = MongoDB.getDatabase()
  const id = req.params.gameId

  db.collection('games')
    .find({ app_id: id })
    .toArray(function(err, result) {
      if (err) throw err
      res.status(200).json({ data: result })
    })
})

module.exports = router
