const _ = require('lodash');
const $ = require('cheerio');

module.exports = {
  getGameIdFromSearchPage: function (resp, name) {
    let html = resp.data;
    let $gamesListHtml = $('table:nth-child(7)', html);
    console.log("$gamesHtml: ", $gamesListHtml.find("td"));


    let games = [];
    /*
    for (let i = 0; i < $gamesListHtml.length; i++) {
      games.push({
        gameTitle: $gamesListHtml[i].children[0].data,
        gameHref: $gamesListHtml[i].attribs.href,
        gameId: $gamesListHtml[i].attribs.href.split('ID=')[1]
      })
    }
    if (games.length >= 0) {
      return games;
    } else {
      console.log('no games matched (%s not found)', name);
      return null;
    }*/

  },

  getGameInfoFromGamePage: function(resp) {

  }
};