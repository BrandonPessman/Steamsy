const axios = require('axios')

let gamelist = []

var updateList = function () {
  console.log('Updating games list...')
  axios
    .get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
    .then(data => {
      let numApplications = data.data.applist.apps.length

      for (let i = 0; i < numApplications; i++) {
        let app_id = '' + data.data.applist.apps[i].appid
        let title = data.data.applist.apps[i].name
        gamelist.push({ app_id: app_id, title: title })
      }

      console.log('Games list successfully updated!')
    })
}

module.exports = {
  updateList: updateList,
  gamelist
}
