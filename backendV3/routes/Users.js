const app = require('express').Router()
const Users = require('../schemas/User')

app.get('/', (req, res) => {
  Users.find({}, function (err, docs) {
    if (err) return err

    res.send(docs)
  })
})

app.post('/', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  var user = new Users({ username: username, password: password, email: email })
  user.save(function (err) {
    if (err) return err
  })

  res.send('Added a new User!')
})

app.delete('/:id', (req, res) => {
  Users.findByIdAndDelete(req.params.id, function (doc) {
    res.send('Removed User: ' + req.params.id)
  })
})

app.patch('/:id', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  Posts.findOneAndUpdate(
    { _id: req.params.id },
    { username: username, password: password, email: email },
    { upsert: true },
    function (doc) {
      res.send('Updated User: ' + req.params.id)
    }
  )
})

module.exports = app
