const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT | 8000

const cron = require('node-cron')

// Setting up Routes
const userRoutes = require('./routes/users')
const reviewRoutes = require('./routes/reviews')
const gamesRoutes = require('./routes/games')
const adminRoutes = require('./routes/admin')

const mongodb = require('./scripts/mongoUtil')
const games = require('./scripts/gamesListUtil')
const database = require('./scripts/databaseUpdates')

// Sets up CORS
app.use(cors())

// Allows Parsing of Bodys
app.use(bodyParser.json())

// Sets up Debug
app.use(morgan('dev'))

// ALL Routes Used
app.use('/user', userRoutes)
app.use('/review', reviewRoutes)
app.use('/game', gamesRoutes)
app.use('/admin', adminRoutes)

// Connect to MongoDB
const mongoConnection = mongodb.connectToMongoDB()

// Daily CRON Job Update
cron.schedule('59 23 * * *', function() {
  console.log('[CRON JOB] Update Steam Games Database')
  database.updateGameDatabase(mongoConnection)
})

// Server Listening on Port
app.listen(port, () => {
  console.log('Server is listening on port ' + port)
})
