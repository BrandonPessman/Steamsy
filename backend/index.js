require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()
const cron = require('node-cron')
const gamelist = require('./gamelist')
gamelist.updateList()

const config = require('./config')

app.use(morgan('tiny'))

app.use(cors())
app.use(bodyParser.json())

const AppId = require('./routes/AppId')
app.use('/AppId', AppId)

const Title = require('./routes/Title')
app.use('/Title', Title)

/* ================= CRON JOBS ================= */
cron.schedule('59 23 * * *', function () {
  gamelist.updateList()
})
/* ============================================= */

// Creates the server and sets it up on the port
if (process.env.NODE_ENV === 'dev') {
  app.listen(config.dev_port, () => {
    console.log('Server is listening on port ' + config.dev_port)
  })
} else if (process.env.NODE_ENV === 'prod') {
  app.listen(config.port, () => {
    console.log('Server is listening on port ' + config.port)
  })
} else {
  console.log('You might be missing a .env file or not set correctly!')
}
