const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  res.status(201).json({ message: 'POST User' })
})

router.get('/:userId', (req, res) => {
  const id = req.params.userId
  res.status(200).json({
    message: 'GET User',
    id: id,
  })
})

router.patch('/:userId', (req, res) => {
  res.status(200).json({ message: 'PATCH User' })
})

router.delete('/:userId', (req, res) => {
  res.status(200).json({ message: 'DELETE User' })
})

module.exports = router
