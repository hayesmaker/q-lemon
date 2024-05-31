// import * as cheerio from "cheerio";

const cheerio = require('cheerio');
const __urlRoot = 'https://www.lemon64.com'

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
            const $screenshotImg = $gameItem.find('.grid-screenshot-container img')[0]
            let game = {
                gameTitle: title,
                gameHref: __urlRoot + $linkItem.attribs.href,
                gameId: parseInt(child.attribs.id.split('-')[1]),
                thumbnail: __urlRoot +  $screenshotImg.attribs.src,
            }
            games.push(game);
        });

        if (games.length >= 0) {
            return games;
        }
        console.warn('Unusual HTML format');
        return [];
    },

    getGameDataFromPage: function (resp, gameId) {
        let html = resp.data;
        if (typeof html !== "string") {
            console.warn('getGameDataFromPage called with non valid html string' + html);
            return;
        }

        const $ = cheerio.load(html);
        const gameTitle = $('h1').text();
        const gameHref = $('Link[rel=canonical]').attr('href');
        return {
            gameTitle,
            gameHref,
            gameId: parseInt(gameId),
        };
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
            voterScore,
            votes,
            scans,
            screenshots,
        ] = Array(11).fill('N/A');

        const gameName = $('h1').text();
        const $creditsArea = $('.credits-area tbody tr');
        $creditsArea.map((i, child) => {

            const multipleLinkTexts = ($aItems) => {
                const collection = []
                $aItems.map((i, c) => {
                    let text = $(c).html();
                    // try to filter weird buttons in the html panel
                    if (
                        text.includes('<strong>') ||
                        text.includes('</i>') ||
                        text.includes('Profile')
                    ) {
                        return;
                    }
                    collection.push($(c).text());
                });
                return collection;
            }

            const $rowItem = $(child);
            const columnTitle = $rowItem.find('td').first().text().trim().toLowerCase();
            const linkText = $rowItem.find('td').eq(1).find('a').first().text().trim();

            if (columnTitle === 'released:') {
                year = linkText;
            }
            if (columnTitle === 'publisher:') {
                publisher = linkText;
            }
            if (columnTitle === 'creator:' || columnTitle === 'coder:') {
                developer = multipleLinkTexts($rowItem.find('td').eq(1).find('a'));
                // developer = linkText;
            }
            if (columnTitle === 'musician:') {
                musician = multipleLinkTexts($rowItem.find('td').eq(1).find('a'));
            }
            if (columnTitle === 'genre:') {
                genres = multipleLinkTexts($rowItem.find('td').eq(1).find('a'));
                genre = [linkText];
            }
            if (columnTitle.includes('retail')) {
                const retailHtml = $rowItem.find('td').eq(1).html();
                retail = retailHtml.split('<br>');
            }
        });

        scans = [];
        const $scansArea = $('ul.scan-slider');
        $scansArea.map((i, child) => {
            const $liItem = $(child);
            $liItem.find('img').map((j, img) => {
                const attribs = $(img)[0].attribs;
                scans.push(__urlRoot + attribs.src);
            });
        });

        screenshots = [];
        const $screenshotsArea = $('.screenshot-area');
        $screenshotsArea.map((i, child) => {
            const $childItem = $(child);
            $childItem.find('img').map((j, img) => {
                const attribs = $(img)[0].attribs;
                screenshots.push(__urlRoot + attribs.src);
            });
        });

        const description = $('meta[property="og:description"]').attr('content');
        const $scoreArea = $('.vote-ajax-area');
        const scoresData = JSON.parse($scoreArea.find('script[type="application/ld+json"]').html());
        if (scoresData && scoresData.mainEntity && scoresData.mainEntity.aggregateRating && scoresData.mainEntity.aggregateRating.ratingValue) {
            voterScore = lemonScore = scoresData.mainEntity.aggregateRating.ratingValue;
        }
        if (scoresData && scoresData.mainEntity && scoresData.mainEntity.aggregateRating) {
            votes = scoresData.mainEntity.aggregateRating;
        }

        return {
            name: gameName,
            description,
            year,
            publisher,
            developer,
            musician,
            genres,
            //@deprecated replaced with genres array
            genre,
            retail,
            review,
            magazine,
            lemonScore,
            voterScore,
            votes,
            scans,
            screenshots,
        };
    },

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

    getCoverImageFromPage: function (resp) {
        let html = resp.data || resp;
        let $ = cheerio.load(html);
        let $image = $('img');
        return $image && $image[0] && $image[0].attribs;
    }
}