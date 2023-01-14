import * as cheerio from "cheerio";

const __urlRoot = 'https://www.lemon64.com'

export default {

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
            let game = {
                gameTitle: title,
                gameHref: __urlRoot + $linkItem.attribs.href,
                gameId: parseInt(child.attribs.id.split('-')[1]),
            }
            games.push(game);
        });

        if (games.length >= 0) {
            return games;
        }
        console.warn('Unusual HTML format');
        return [];
    },

    getGameInfoFromGamePage: function (resp) {
        let html = resp.data || resp;
        //let $pageTable = $('table', html).first();
        const $ = cheerio.load(html);
        let [
            year,
            publisher,
            developer,
            musician,
            genres,
            genre,
            retail,
            review,
            magazine,
            lemonScore,
            scans
        ] = Array(11).fill('N/A');

        const gameName = $('h1').text();
        const $creditsArea = $('.credits-area tbody tr');
        $creditsArea.map((i, child) => {
            // console.log('%s>>>>>>>>>>>>>>', i);
            const $rowItem = $(child);
            const columnTitle = $rowItem.find('td').first().text().trim().toLowerCase();
            const linkText = $rowItem.find('td').eq(1).find('a').first().text().trim();
            const nonLinkText = $rowItem.find('td').eq(1).text().trim();

            if (columnTitle === 'released:') {
                year = linkText;
            }
            if (columnTitle === 'publisher:') {
                publisher = linkText;
            }
            if (columnTitle === 'creator:') {
                developer = linkText;
            }
            if (columnTitle === 'musician:') {
                musician = linkText;
            }
            if (columnTitle === 'genre:') {
                genres = [];
                $rowItem.find('td').eq(1).find('a').map((i, c) => {
                    genres.push($(c).html());
                });
                genre = [linkText];
            }
            if (columnTitle.includes('retail')) {
                retail = nonLinkText;
            }
            //console.log('<<<<<<<<<<<<<<<');
        });

        scans = [];
        const $scansArea = $('ul.scan-slider');
        $scansArea.map((i, child) => {
            const $liItem = $(child);
            $liItem.find('img').map((j, img) => {
                const attribs = $(img)[0].attribs;
                // console.log('attribs.src', attribs.src);
                scans.push(__urlRoot + attribs.src);
            });
        });
        return {
            name: gameName,
            year,
            publisher,
            developer,
            musician,
            genres,
            genre, //@deprecated replaced with genres array
            retail,
            review,
            magazine,
            lemonScore,
            scans
        };
    },

    appendCoverImages: function(game) {
        if (game.metadata.scans.length === 0)
        {
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

    getCoverImageFromPage: function (resp) {
        let html = resp.data || resp;
        let $ = cheerio.load(html);
        let $image = $('img');
        return $image && $image[0] && $image[0].attribs;
    }
}