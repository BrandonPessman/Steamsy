const express = require('express')
const router = express.Router()

router.get('/:gameId', (req, res) => {
  const id = req.params.reviewId
  res.status(200).json({
    message: 'GET Review',
    id: id,
  })
})

module.exports = router
