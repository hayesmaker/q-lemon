const axios = require('axios');
const scraper = require('./lemon-scraper');

module.exports = {
  searchGame(name, callback) {
    return axios.get(`https://www.lemon64.com/games/list.php?type=title&name=${name.toLowerCase()}`)
      .then(function (resp) {
        return scraper.getGameIdFromSearchPage(resp, name)
      })
      .then(function (game) {
        console.log("query by gameId", game.gameId);
        if (game) {
          let uri = encodeURI(`https://www.lemon64.com/games/details.php?ID=${game.gameId}`);
          return axios.get(uri)
        }
      })
      .then(function (resp) {
        console.log("end of search game :: ", resp);
        if (callback) {
          callback.call(this, resp)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
};