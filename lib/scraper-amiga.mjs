import * as cheerio from 'cheerio';

export default {

  getGameIdFromSearchPage: function (resp, name) {

    let html = resp.data;
    const $ = cheerio.load(html);
    let $gamesListHtml = $.html()
        .find("table").eq(9)
        .find('tr td');
    let games = [];
    let len = parseInt($gamesListHtml.length, 10);
    for (let i = 0; i < len ; i++) {
      games.push({
        gameTitle: $gamesListHtml.eq(i).find('a').eq(0).text(),
        gameId: $gamesListHtml.eq(i)
            .find('a')
            .eq(0)
            .attr('href')
            .split('id=')[1]
      });
    }
    if (games.length >= 0) {
      return games;
    } else {
      console.log('no games matched (%s not found)', name);
      return null;
    }

  },

  getGameInfoFromGamePage: function(resp) {
    let html = resp.data;
    let $tableHtml = $(html)
        .find('table').eq(14);
    let tableIndex;
    let hasBoxArt = $tableHtml.find("img").attr('src') === "/images/tables/boxes.gif"
    let boxArtId = 0;
    if (hasBoxArt) {
      tableIndex = 16;
      boxArtId = $tableHtml.find("a").attr("href").split("?id=")[1].split("&type")[0]
    } else {
      tableIndex = 14;
    }
    let $gameHtml = $(html)
        .find('table').eq(tableIndex).find('tbody tr')
        .eq(1).find('td').eq(1).find('table').eq(1)
    let $cretitsHTML = $(html)
        .find('table').eq(tableIndex).find('tbody tr')
        .eq(1).find('td').eq(1).find('table').eq(2)
    return {
      name: $gameHtml.find('td').eq(0).text().trim(),
      year: $gameHtml.find('td').eq(1).find('a')
          .eq(0).text().trim(),
      publisher: $gameHtml.find('td').eq(1).find('a')
          .eq(1).text().trim(),
      developer: $cretitsHTML.find('tr')
          .eq(3).find('td').eq('1').text().trim(),
      musician: $cretitsHTML.find('tr')
          .eq(6).find('td').eq(1).find('a').eq(0).text().trim(),
      genre: $cretitsHTML.find('tr')
          .eq(10).find('td').eq(1).text().trim(),
      hasBoxArt: hasBoxArt,
      boxArtId: boxArtId
    }
  },

  getCoverImageFromPage: function(resp) {
    let html = resp.data;
    let $image = $(html).find("img").eq(14);
    let imageObj = $image[0].attribs;
    imageObj.src = "http://www.lemonamiga.com" + imageObj.src;
    return imageObj;
  }
}