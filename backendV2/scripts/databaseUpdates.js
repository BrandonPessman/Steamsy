const axios = require('axios')
const mongodb = require('./mongoUtil')
const games = require('./gamesListUtil')

module.exports = {
  updateGameDatabase: function(db) {
    var database = db
    console.log('=================================')
    console.log('Starting Game List Update...')
    axios
      .get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
      .then(response => {
        var totalApps = response.data.applist.apps.length
        console.log('Preparing ' + totalApps + ' total Steam applications...')
        database.collection('games').drop()
        console.log('Dropping Games Table...')
        database.createCollection('games')
        console.log('Creating Games Table...')
        for (let i = 0; i < totalApps; i++) {
          database.collection('games').insertOne({
            app_id: '' + response.data.applist.apps[i].appid,
            title: response.data.applist.apps[i].name,
          })
          console.log(i + '. ' + response.data.applist.apps[i].name + ' Added!')
        }
        console.log('=================================')
        console.log('Game List Updated!')
        console.log('=================================')
        games.updateListOfGamesDatabase()
      })
  },
}
