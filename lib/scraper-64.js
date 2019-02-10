const _ = require('lodash');
const $ = require('cheerio');

module.exports = {
    getGameIdFromSearchPage: function (resp, name) {
        let html = resp.data;
        let $gamesListHtml = $('ul.games .ginfo h2 a', html);
        let games = [];
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
        }
    },

    getGameInfoFromGamePage: function(resp) {
        let html = resp.data;
        //let $pageTable = $('table', html).first();
        let $mainTable = $('table table', html).first().find("table");
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

    getCoverImageFromPage: function(resp) {
        let html = resp.data;
        let $image = $('img', html);
        return $image[0].attribs;
    }
};