import * as cheerio from "cheerio";

export default {

  /**
   *
   * @method getGames
   * @param {object} resp
   * @param {string} name
   * @returns
   */
  getGames: function(resp, name) {
    let html = resp.data || resp;
    const $ = cheerio.load(html);
    let $title = $('title')[0].children[0];
    let pageTitle = $title.data;
    let games = [];
    if (pageTitle.indexOf('Commodore 64 Games:') >= 0) {
      let $gamesListHtml;
      $gamesListHtml = $('ul.games .ginfo h2 a');
      for (let i = 0; i < $gamesListHtml.length; i++) {
        games.push({
          gameTitle: $gamesListHtml[i].children[0].data,
          gameHref: $gamesListHtml[i].attribs.href,
          gameId: $gamesListHtml[i].attribs.href.split('ID=')[1]
        });
      }
      if (games.length >= 0) {
        return games;
      }
    } else if (pageTitle.indexOf('Commodore 64 Game') >= 0) {
      console.log('Single Game Found');
      let $script = $('script')[1].children[0];
      const gameData = {
        gameId: null,
        gameTitle: null,
        gameDescription: null,
        coverLocation: null,
        gameHref: null,
      };
      // console.log('script data:', script.data);
      let lines = $script.data.split("\n");
      lines.forEach((line) => {
        if (line.trim().length) {
          let match = line
              .trim()
              .replace('"', '')
              .replace('"', '')
              .replace(';', '')
              .split(" = ")
          switch(match[0]) {
            case "gameid" :
              gameData.gameId = match[1];
              break;
            case "coverLocation":
              gameData.coverLocation = match[1];
              break;
          }
        }
      });
      let $link = $('link')[1];
      gameData.gameHref =  $link.attribs.href;
      let $meta1 = $('meta')[1];
      gameData.gameTitle = $meta1.attribs.content.split(' - ')[1];
      let $meta2 = $('meta')[7];
      gameData.gameDescription = $meta2.attribs.content;
      return [gameData];
    }
    console.log('Ususual HTML format');
    return [];
  },

  getGameInfoFromGamePage: function (resp) {
    let html = resp.data || resp;
    //let $pageTable = $('table', html).first();
    const $ = cheerio.load(html);
    let $mainTable = $('table table').first().find("table");
    let $tableHeader = $mainTable.find('table td.normalheadblank');
    let gameName = $tableHeader.find('div').first().text().trim();
    let year = $tableHeader.find('div a b')[0].children[0].data;
    let publisher = $tableHeader.find('div a b')[1].children[0].data;
    let $metaDataTable = $mainTable.find("tbody td")
        .eq(1)
        .find("table table")
        .eq(1)
        .find("table");//.find("table tbody tr td").html();
    let creator = $metaDataTable.find("tr td a").eq(0).text();
    let musician = $metaDataTable.find("tr td a").eq(2).text();
    let genre = $metaDataTable.find("tr td a").eq(4).text();
    let review = $metaDataTable.find("tr td a").eq(6).text();
    let magazine = $metaDataTable.find("tr td a").eq(12).text();
    let lemonScore = null;
    //let $lemonScoreTable = $pageTable.find("tbody tr td")[1].children;
    //console.log("$metaDataTable", $metaDataTable);

    return {
      name: gameName,
      year,
      publisher,
      developer: creator,
      musician,
      genre,
      review,
      magazine,
      lemonScore
    };
  },

  getCoverImageFromPage: function (resp) {
    let html = resp.data || resp;
    let $ = cheerio.load(html);
    let $image = $('img');
    return $image && $image[0] && $image[0].attribs;
  }
}