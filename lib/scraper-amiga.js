// import * as cheerio from "cheerio";

const cheerio = require('cheerio');
const {YARGS_PARSER_CONFIG} = require("mocha/lib/cli/options");
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

    const multipleLinkTexts = ($aItems) => {
      const collection = []
      $aItems.map((i, c) => {
        let text = $(c).html();

        // console.log('multiText', i, text, $(c).text());

        // try to filter weird buttons in the html panel
        if (
          text.includes('<strong>') ||
          text.includes('</i>') ||
          text.includes('Profile')
        ) {
          return;
        }

        collection.push($(c).text());
        // console.log('collection', collection);
      });
      return collection;
    }

    let [
      name,
      description,
      hardware,
      disks,
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
    ] = Array(17).fill('N/A');

    name = $('h1').text();

    const $creditsRows = $('table.table-credits tbody tr');
    $creditsRows.map((i, child) => {

      const $rowItem = $(child);

      const colNums = $rowItem.find('td').length;
      if (colNums !== 2) {
        return;
      }
      const colText = $rowItem.find('td')
        .first()
        .text()
        .replace(':', '')
        .toLowerCase();


      const $link1 = $rowItem.find('td').eq(1).find('a');
      const valText = $link1
        .first()
        .text()
        .trim();

      if (!valText) {
        return;
      }

      if (colText === 'published') {
        year = valText;
        publisher = $rowItem.find('td').eq(1)
          .find('a')
          .eq(1)
          .text()
          .trim();
      }

      if (colText === 'coder' || colText === 'creator') {
        developer = multipleLinkTexts($link1);
      }

      if (colText === 'musician') {
        musician = multipleLinkTexts($link1);
      }

      if (colText === 'genre') {
        genres = multipleLinkTexts($link1);
      }

      if (colText === 'hardware') {
        hardware = multipleLinkTexts($link1)
      }

      if (colText === 'disks') {
        disks = valText;
      }
      // console.log('col:', colNums, colText, 'value:', valText);
    });

    scans = [];
    $('a[data-featherlight="image"]').map((i, el) => {
      // console.log('coverscan? [%s]',i, el.attribs.href);
      scans.push(__urlRoot + el.attribs.href);
    });

    //lSPager lSGallery
    screenshots = [];
    const $screenshotsArea = $('.screenshot-area');
    $screenshotsArea.map((i, child) => {
      const $childItem = $(child);
      $childItem.find('img').map((j, img) => {
        const attribs = $(img)[0].attribs;
        screenshots.push(__urlRoot + attribs.src);
      });
    });
    // const $boxScanArea = $('.box.game-assets-main');
    // console.log('boxScans:', $boxScanArea.html());

    // const description = $('meta[property="og:description"]').attr('content');
    const $scoreArea = $('.vote-ajax-area');
    const scoresData = JSON.parse($scoreArea.find('script[type="application/ld+json"]').html());
    if (scoresData && scoresData.mainEntity && scoresData.mainEntity.aggregateRating && scoresData.mainEntity.aggregateRating.ratingValue) {
      voterScore = lemonScore = scoresData.mainEntity.aggregateRating.ratingValue;
    }
    if (scoresData && scoresData.mainEntity && scoresData.mainEntity.aggregateRating) {
      votes = scoresData.mainEntity.aggregateRating;
    }

    // console.log('$table (html)', $table.html());//

    const scrapedData = {
      name,
      description,
      hardware,
      disks,
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

    // console.log('scrapedData:', scrapedData);

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