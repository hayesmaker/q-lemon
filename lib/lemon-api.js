import axios from "axios";
import scraperAmiga from './scraper-amiga.js';

import scraper64 from "./scraper-64.js";

export default {
  getScraper(site) {
    return site && site === "amiga"? scraperAmiga : scraper64
  },

  getSearchUrl(name, site) {
    //https://www.lemon64.com/games/list.php?type=title&name=round+the+bend&submit.x=30&submit.y=11
    let queryUrl = site && site === 'amiga'?
        `http://www.lemonamiga.com/games/list.php?list_title=${name.toLowerCase()}` :
        `https://www.lemon64.com/games/list.php?type=title&name=${name.toLowerCase()}`

    console.log('queryUrl=', encodeURI(queryUrl));
    return encodeURI(queryUrl);
  },

  getGameUrl(gameId, site) {
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/details.php?id=${gameId}`
    } else {
      return `https://www.lemon64.com/games/details.php?ID=${gameId}`
    }
  },

  getCoverUrl(gameId, site) {
    if (site && site === "amiga") {
      return `http://www.lemonamiga.com/games/box.php?id=${gameId}`;
    } else {
      return `https://www.lemon64.com/games/view_cover.php?gameID=${gameId}`;
    }
  },

  searchGame(name, site) {
    let url = this.getSearchUrl(name, site);
    let scraper = this.getScraper(site);
    let headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(url, {headers})
        .then(function (resp) {
          return scraper.getGames(resp.data, name)
        })
        .catch(function (error) {
          console.log('Search Game Error', error.status);
          console.log(error);
        });
  },

  getGameByGameId(gameId, site) {
    let uri = encodeURI(this.getGameUrl(gameId, site));
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
    let uri = encodeURI(this.getCoverUrl(boxIdOrGameName, site));
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
}