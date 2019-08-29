const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/:gameid', (req, res) => {
  const gameid = req.params.gameid

  axios
    .get(
      'https://store.steampowered.com/appreviews/' +
        gameid +
        '?json=1&start_offset=20&day_range=9223372036854775807&language=english&filter=created&review_type=all&purchase_type=all'
    )
    .then(response => {
      res.status(200).json({
        gameid: gameid,
        data: response.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router
