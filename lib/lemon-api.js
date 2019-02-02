const axios = require('axios');
const scraper = require('./scraper-64');
const scraperAmiga = require('./scraper-amiga')

//http://www.lemonamiga.com/games/list.php?list_title=cannon%20fodder
//http://www.lemonamiga.com/games/details.php?id=215
//http://www.lemonamiga.com/games/box.php?id=169

module.exports = {

  getSearchUrl(site, name) {
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/list.php?list_title=${name}`
    } else {
      return `https://www.lemon64.com/games/list.php?type=title&name=${name}`
    }
  },

  getGameUrl(site, gameId) {
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/details.php?id=${gameid}`
    } else {
      return `https://www.lemon64.com/games/details.php?ID=${gameId}`
    }
  },

  getCoverUrl(site, boxId) {
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/box.php?id=${boxId}`;
    } else {
      return `https://www.lemon64.com/games/list.php?type=title&name=${boxId}`;
    }
  },

  searchGame(name, site) {
    let uri = encodeURI(this.getSearchUrl(site, name));
    return axios.get(uri)
      .then(function (resp) {
        console.log('searchGame', name);
        return scraper.getGameIdFromSearchPage(resp, name)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getGameByGameId(gameId, site) {
    let uri = encodeURI(this.getGameUrl(site, gameId));
    return axios.get(uri)
      .then(function (resp) {
        return scraper.getGameInfoFromGamePage(resp)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getCoverImageByGameId(gameId, site) {
    console.log('getCoverImageByGameId', gameId, site);
    let uri = encodeURI(this.getCoverUrl(gameId, site));
    return axios.get(uri)
      .then(function(resp) {
        return scraper.getCoverImageFromPage(resp)
      })
      .catch(function(error) {
        console.log(error);
      })

  }
};