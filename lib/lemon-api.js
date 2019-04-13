const axios = require('axios');
const scraper64 = require('./scraper-64');
const scraperAmiga = require('./scraper-amiga');

module.exports = {
  getScraper(site) {
    return site && site === "amiga"? scraperAmiga : scraper64
  },

  getSearchUrl(site, name) {
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/list.php?list_title=${name}`
    } else {
      return `https://www.lemon64.com/games/list.php?type=title&name=${name}`
    }
  },

  getGameUrl(site, gameId) {
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/details.php?id=${gameId}`
    } else {
      return `https://www.lemon64.com/games/details.php?ID=${gameId}`
    }
  },

  getCoverUrl(site, boxId) {
    let gameId;
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/box.php?id=${boxId}`;
    } else {
      gameId = boxId;
      return `https://www.lemon64.com/games/view_cover.php?gameID=${gameId}`;
    }
  },

  searchGame(name, site) {
    let uri = encodeURI(this.getSearchUrl(site, name));
    let scraper = this.getScraper(site);
    return axios.get(uri)
      .then(function (resp) {
        return scraper.getGameIdFromSearchPage(resp, name)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getGameByGameId(gameId, site) {
    let uri = encodeURI(this.getGameUrl(site, gameId));
    let scraper = this.getScraper(site);
    console.log("getGamePage :: url", uri);
    return axios.get(uri)
      .then(function (resp) {
        return scraper.getGameInfoFromGamePage(resp)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getCoverImageByGameId(boxIdOrGameName, site) {
    let uri = encodeURI(this.getCoverUrl(site, boxIdOrGameName));
    let scraper = this.getScraper(site);
    console.log("getCoverImageByGameId :: url", uri);
    return axios.get(uri)
      .then(function(resp) {
        return scraper.getCoverImageFromPage(resp)
      })
      .catch(function(error) {
        console.log(error);
      })

  }
};