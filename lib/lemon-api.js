const axios = require('axios');
const scraper = require('./lemon-scraper');

module.exports = {

  searchGame(name) {
    let uri = encodeURI(`https://www.lemon64.com/games/list.php?type=title&name=${name.toLowerCase()}`);
    return axios.get(uri)
      .then(function (resp) {
        console.log('searchGame', name);
        return scraper.getGameIdFromSearchPage(resp, name)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getGameByGameId(gameId) {
    let uri = encodeURI(`https://www.lemon64.com/games/details.php?ID=${gameId}`);
    return axios.get(uri)
      .then(function (resp) {
        return scraper.getGameInfoFromGamePage(resp)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getCoverImageByGameId(gameId) {
    console.log('getCoverImageByGameId');
    let uri = encodeURI(`https://www.lemon64.com/games/view_cover.php?gameID=${gameId}`);
    return axios.get(uri)
      .then(function(resp) {
        return scraper.getCoverImageFromPage(resp)
      })
      .catch(function(error) {
        console.log(error);
      })

  }
};