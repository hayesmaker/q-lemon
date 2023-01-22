import axios from "axios";
import scraperAmiga from './scraper-amiga.js';

import scraper64 from "./scraper-64.js";

export default {
    getScraper(site) {
        return site && site === "amiga" ? scraperAmiga : scraper64
    },

    getSearchUrl(name, site) {
        //https://www.lemon64.com/games/list.php?type=title&name=round+the+bend&submit.x=30&submit.y=11
        let queryUrl = site && site === 'amiga' ?
            `http://www.lemonamiga.com/games/list.php?list_title=${name.toLowerCase()}` :
            `https://www.lemon64.com/games/list.php?list_title=${name.toLowerCase()}`
        return encodeURI(queryUrl);
    },

    getGameUrl(gameId, site) {
        if (site && site === "amiga") {
            return `http://www.lemonamiga.com/games/details.php?id=${gameId}`
        } else {
            return `https://www.lemon64.com/games/details.php?ID=${gameId}`
        }
    },

    searchGame(name, site) {
        console.log('lemon-api::searchGame name', name);
        let url = this.getSearchUrl(name, site);
        let scraper = this.getScraper(site);
        let headers = {
            'Content-Type': 'application/json'
        }
        return axios.get(url, {headers})
            .then(function (resp) {
                if (resp.status === 200) {
                    return scraper.getGames(resp.data)
                }
            })
            .catch(function (error) {
                console.log('Search Game Error', error.status);
                console.log(error);
            });
    },

    async hydrateGame(g) {
        const scraper = scraper64;
        let headers = {
            'Content-Type': 'application/json'
        }
        let url = encodeURI(this.getGameUrl(g.gameId, 'c64'));
        const lemonHtml = await axios.get(url, { headers });
        g.metadata = scraper.getGameInfoFromGamePage(lemonHtml);
        this.getCoverImageByGameId(g, 'c64');
        return Promise.resolve(g);
    },

    async searchAndHydrate(name) {
        let games = await this.searchGame(name);
        await Promise.allSettled(games.map((g) => {
                return this.hydrateGame(g);
            })
        );
        return Promise.resolve(games);
    },

    async getGameByGameId(gameId, site) {
        let uri = encodeURI(this.getGameUrl(gameId, site));
        let scraper = this.getScraper(site);
        console.log('Get Game By Game ID:', gameId, uri);
        return axios.get(uri)
            .then(function (resp) {
                return {
                    ...scraper.getGameDataFromPage(resp, gameId),
                    metadata: scraper.getGameInfoFromGamePage(resp)
                };
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getCoverImageByGameId(game, site) {
        let scraper = this.getScraper(site);
        scraper.appendCoverImages(game);
    }
}