require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()
const cron = require('node-cron')
//const axios = require('axios')

//const database = require('./database')

const gamelist = require('./gamelist')
gamelist.updateList()

const config = require('./config')

app.use(morgan('tiny'))

app.use(cors())
app.use(bodyParser.json())

mongoose.set('useFindAndModify', false)

const Users = require('./routes/Users')
app.use('/Users', Users)

const AppId = require('./routes/AppId')
app.use('/AppId', AppId)

/* ================= CRON JOBS ================= */
const Games = require('./schemas/Game')

cron.schedule('59 23 * * *', function () {
  gamelist.updateList()
  // REMOVING THE NEED FOR A DATABASE BY PUTTING STEAM GAME APPIDS IN MEMORY
  // I"LL KEEP THIS CODE IF I WANT THE DATABASE AGAIN
  // axios
  //   .get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
  //   .then(data => {
  //     let numApplications = data.data.applist.apps.length

  //     var filesSaved = 0
  //     for (let i = 0; i < numApplications; i++) {
  //       let app_id = '' + data.data.applist.apps[i].appid
  //       let title = data.data.applist.apps[i].name

  //       var game = new Games({ app_id: app_id, title: title })
  //       console.log(
  //         ((i / numApplications) * 100).toFixed(2) +
  //           '% creating queries for database'
  //       )

  //       game.save(function (err) {
  //         console.log(
  //           ((filesSaved / numApplications) * 100).toFixed(2) +
  //             '% data saved in database'
  //         )
  //         filesSaved++
  //         if (err) return err
  //       })
  //     }
  //   })
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
