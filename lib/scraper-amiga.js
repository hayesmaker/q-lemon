// import * as cheerio from "cheerio";

const cheerio = require('cheerio');
const __urlRoot = 'https://www.lemonamiga.com';

module.exports = {
  /**
   *
   * @method getGames
   * @param {object} resp
   * @returns
   */
  getGames: function (resp) {
    let html = resp.data || resp;
    const $ = cheerio.load(html);
    let games = [];

    $('.game-col').map((i, child) => {
      const $gameItem = $(child);
      const $titleContainer = $gameItem.find('.game-grid-title');
      const title = $titleContainer.text().trim();
      const $linkItem = $titleContainer.find('a')[0];
      const $screenshotImg = $gameItem.find('img.grid-screenshot')[0]
      let game = {
        gameTitle: title,
        gameHref: __urlRoot + '/games/' + $linkItem.attribs.href,
        gameId: child && child.attribs && child.attribs.id && parseInt(child.attribs.id.split('-')[1]),
        thumbnail: __urlRoot + $screenshotImg.attribs.src,
      }
      games.push(game);
    });

    if (games.length >= 0) {
      return games;
    }
    console.warn('No Games found or unusual HTML format');
    return [];
  },

  getGameInfoFromGamePage: function (resp) {
    let html = resp.data || resp;
    //let $pageTable = $('table', html).first();
    const $ = cheerio.load(html);
    let [
      name,
      description,
      year,
      publisher,
      developer,
      musician,
      genres,
      retail,
      review,
      magazine,
      lemonScore,
      voterScore,
      votes,
      scans,
      screenshots,
    ] = Array(15).fill('N/A');

    name = $('h1').text();

    console.log('Game Name:', name);

    const scrapedData = {
      name,
      description,
      year,
      publisher,
      developer,
      musician,
      genres,
      retail,
      review,
      magazine,
      lemonScore,
      voterScore,
      votes,
      scans,
      screenshots,
    };

    console.log('scrapedData:', scrapedData);

    return scrapedData;
  },

  /**
   * @deprecated
   * @param game
   */
  appendCoverImages: function (game) {
    // console.log('game::appendCoverImages', game);
    if (!game.metadata) {
      return
    }
    if (!game.metadata.scans) {
      return
    }
    if (game.metadata && game.metadata.scans && game.metadata.scans.length === 0) {
      return;
    }
    const coverImages = game.metadata.scans.filter((imageSrc, i) => {
      return imageSrc.indexOf('covers') >= 0;
    });
    if (coverImages.length > 0) {
      game.covers = coverImages;
      game.image = coverImages[0];
    }
  },

  /**
   * @deprecated
   * @param resp
   */
  getCoverImageFromPage: function (resp) {
    let html = resp.data || resp;
    let $ = cheerio.load(html);
  }
}