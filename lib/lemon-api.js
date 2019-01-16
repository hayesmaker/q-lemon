const axios = require('axios');
const scraper = require('./lemon-scraper');

module.exports = {

  searchGame(name) {
    let uri = encodeURI(`https://www.lemon64.com/games/list.php?type=title&name=${name.toLowerCase()}`);
    return axios.get(uri)
      .then(function (resp) {
        return scraper.getGameIdFromSearchPage(resp, name)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getGameByGameId(game) {
    let gameId = game.gameId;
    let uri = encodeURI(`https://www.lemon64.com/games/details.php?ID=${gameId}`);
    return axios.get(uri)
      .then(function (resp) {
        return "test page" + resp
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};