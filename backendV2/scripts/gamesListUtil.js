var listOfGames
var databaseUpdates = require('./databaseUpdates')
module.exports = {
  updateListOfGames: function(db) {
    db.collection('games')
      .find({})
      .toArray(function(err, result) {
        if (err) throw err
        listOfGames = result
        console.log('Local Games List Updated!')
      })
  },

  getListOfGames: function() {
    return listOfGames
  },
}
