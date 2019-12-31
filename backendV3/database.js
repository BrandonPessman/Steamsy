const mongoose = require('mongoose')
const config = require('./config')

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${config.dev_db}`)
})

if (process.env.NODE_ENV === 'dev') {
  const db = {
    connection: mongoose.connect(config.dev_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  module.exports = db
} else if (process.env.NODE_ENV === 'prod') {
  const db = {
    connection: mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  module.exports = db
} else {
  console.log('You might be missing a .env file or not set correctly!')
}
