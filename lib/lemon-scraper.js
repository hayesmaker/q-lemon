const _ = require('lodash');
const $ = require('cheerio');

module.exports = {
    getGameIdFromSearchPage: function (resp, name) {
        let html = resp.data;
        let $gamesListHtml = $('ul.games .ginfo h2 a', html);
        console.log('gamesList:', $gamesListHtml.length);
        let games = [];
        for (let i = 0; i < $gamesListHtml.length; i++) {
            games.push({
                gameTitle: $gamesListHtml[i].children[0].data,
                gameHref: $gamesListHtml[i].attribs.href,
                gameId: $gamesListHtml[i].attribs.href.split('ID=')[1]
            })
        }
        if (games.length === 1) {
            return games[0];
        } else if (games.length > 1) {
            let matchedGame = _.find(games, {gameTitle: name});
            if (matchedGame) {
                return matchedGame
            }
        }
        console.log('no games matched (%s not found)', name);
    }
};