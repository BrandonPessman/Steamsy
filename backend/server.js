const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const axios = require('axios')
const cors = require('cors')
const CircularJSON = require('circular-json')

const app = express()
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

// For Cors
app.use(cors()) // Use this after the variable declaration

// For the .env Files
require('dotenv').config()

// MongoDB URL
const dbRoute =
  'mongodb+srv://' +
  process.env.DB_USER +
  ':' +
  process.env.DB_PASSWORD +
  '@' +
  process.env.DB_HOST

// Connects Backend to MongoDB
mongoose.connect(dbRoute, { useNewUrlParser: true })
let db = mongoose.connection

// Once Connected to MongoDB, Print this
db.once('open', () => console.log('connected to the database'))

// If there is an error, Print this
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Parses JSON files better
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
app.use(logger('dev'))

if (process.env.NODE_ENV == 'production') {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  })
} else {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'))
  })
}

// Repopulate our database
app.post('/admindashboard', (req, res) => {
  // USED FOR POPULATING GAMES DATABASE
  axios
    .get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
    .then(response => {
      var totalApps = response.data.applist.apps.length
      db.collection('games').drop()
      db.createCollection('games')
      for (let i = 0; i < totalApps; i++) {
        db.collection('games').insertOne({
          app_id: '' + response.data.applist.apps[i].appid,
          title: response.data.applist.apps[i].name,
        })
      }
    })
})

// Reset Feedback DB
app.post('/resetfeedbackdb', (req, res) => {
  db.collection('feedback').drop()
})

// Reset Users DB
app.post('/resetusersdb', (req, res) => {
  db.collection('users').drop()
})

// Reset Favorites DB
app.post('/resetfavoritesdb', (req, res) => {
  db.collection('favorites').drop()
})

app.post('/feedback', (req, res) => {
  db.collection('feedback').insertOne({
    name: req.body.name,
    email: req.body.email,
    type: req.body.type,
    feedback: req.body.feedback,
  })
})

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    db.collection('users').insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })
  })
})

app.post('/login', (req, res) => {
  db.collection('users')
    .findOne({ username: req.body.username })
    .then(function(user) {
      if (!user) throw new Error('No record found.')

      var hash = user.password
      bcrypt.compare(req.body.password, hash, function(err, ress) {
        if (ress) {
          res.send(JSON.stringify({ status: 'success', id: user._id }))
        } else {
          res.send(JSON.stringify({ status: 'failure' }))
        }
      })
    })
})

app.post('/grabfeedback', (req, res) => {
  db.collection('feedback')
    .find({})
    .toArray(function(err, result) {
      if (err) throw err
      res.send(JSON.stringify({ data: result }))
    })
})

app.post('/grabfavorites', (req, res) => {
  db.collection('favorites')
    .find({ username: req.body.username })
    .toArray(function(err, result) {
      if (err) throw err
      res.send(JSON.stringify({ data: result }))
    })
})

app.post('/setfavorite', (req, res) => {
  console.log(req.body)
  db.collection('favorites').insertOne({
    username: req.body.username,
    app_id: req.body.app_id,
    title: req.body.title,
  })
})

app.post('/grabusers', (req, res) => {
  db.collection('users')
    .find({})
    .toArray(function(err, result) {
      if (err) throw err
      res.send(JSON.stringify({ data: result }))
    })
})

// Search a Game to Our Database
app.post('/search', (req, res) => {
  var specificData = req.body.searchValue
  console.log(req.body)
  db.collection('games')
    .findOne({ title: specificData })
    .then(function(doc) {
      if (!doc) throw new Error('No record found.')
      res.send(CircularJSON.stringify(doc))
    })
})

// Returns review of game from searchValue
app.post('/getreviews', (req, res) => {
  //console.log(req.body.appid);
  let specificData = req.body.appid
  axios
    .get(
      'https://store.steampowered.com/appreviews/' + specificData + '?json=1'
    )
    .then(response => {
      res.send(CircularJSON.stringify(response.data))
    })
    .catch(error => {
      //console.log(error);
    })
})

// Returns review of game from searchValue
app.post('/getreviewsV2', (req, res) => {
  //console.log(req.body.appid);
  let specificData = req.body.appid
  for (let i = 0; i < 10; i++) {
    axios
      .get(
        'https://store.steampowered.com/appreviews/' +
          specificData +
          '?json=1&start_offset=20&day_range=9223372036854775807&language=english&filter=created&review_type=all&purchase_type=all'
      )
      .then(response => {
        res.send(CircularJSON.stringify(response.data))
      })
      .catch(error => {
        //console.log(error);
      })
  }
})

// append /api for our http requests
app.use('/api', router)

// launch our backend into a port
app.listen(process.env.PORT, () =>
  console.log('LISTENING ON PORT ' + process.env.PORT)
)
