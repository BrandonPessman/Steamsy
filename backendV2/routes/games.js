const express = require('express')
const router = express.Router()
const MongoDB = require('../scripts/mongoUtil')

router.post('/', (req, res) => {
  res.status(201).json({ message: 'POST Game' })
})

router.get('/:gameId', (req, res) => {
  const db = MongoDB.getDatabase()
  const id = req.params.gameId

  db.collection('games')
    .find({ app_id: id })
    .toArray(function(err, result) {
      if (err) throw err
      res.status(200).json({ data: result })
    })
})

router.patch('/:reviewId', (req, res) => {
  res.status(200).json({ message: 'PATCH Review' })
})

router.delete('/:reviewId', (req, res) => {
  res.status(200).json({ message: 'DELETE Review' })
})

module.exports = router
