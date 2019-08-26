var listOfGames

module.exports = {
  updateListOfGames(db) {
    db.collection('games')
      .find({})
      .toArray(function(err, result) {
        if (err) throw err
        listOfGames = result
        console.log('Local Games List Updated!')
      })
  },

  getListOfGames() {
    return listOfGames
  },
}
