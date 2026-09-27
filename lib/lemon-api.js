// import axios from "axios";
// import scraperAmiga from './scraper-amiga.mjs';
// import scraper64 from "./scraper-64.mjs";

const axios = require('axios');
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const scraperAmiga = require('./scraper-amiga');
const scraper64 = require('./scraper-64');
const chalk = require("chalk");

const requestHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
};

const defaultBrowserProfile = path.join(os.homedir(), '.qlemon-browser-session');

function isCloudflareChallenge(error) {
    return error &&
        error.response &&
        error.response.status === 403 &&
        error.response.headers &&
        error.response.headers['cf-mitigated'] === 'challenge';
}

function isCloudflarePage(html) {
    return typeof html === 'string' && (
        html.includes('challenges.cloudflare.com') ||
        html.includes('cf-mitigated') ||
        html.includes('Just a moment')
    );
}

function createCloudflareError(url) {
    const error = new Error(
        `Lemon64 returned a Cloudflare human check for ${url}. ` +
        `Run with --browser-session to complete the check in a browser-backed session.`
    );
    error.code = 'LEMON64_CLOUDFLARE_CHALLENGE';
    error.status = 403;
    return error;
}

function createIncompleteCloudflareError(url) {
    const error = new Error(
        `Cloudflare did not accept the browser session for ${url}. ` +
        `Try again with --browser-session --browser-channel=chrome and a persistent --browser-profile.`
    );
    error.code = 'LEMON64_CLOUDFLARE_INCOMPLETE';
    error.status = 403;
    return error;
}

function createCdpConnectionError(endpoint, cause) {
    const error = new Error(
        `Could not connect to Chrome CDP at ${endpoint}. ` +
        `Start Chrome with \`npm run chrome:cdp\`, then run qlemon again.`
    );
    error.code = 'LEMON_BROWSER_CDP_UNAVAILABLE';
    error.cause = cause;
    return error;
}

function createHttpError(error, url) {
    const status = error && error.response && error.response.status;
    const message = status ?
        `Lemon request failed with status ${status} for ${url}` :
        `Lemon request failed for ${url}: ${error.message}`;
    const httpError = new Error(message);
    httpError.code = 'LEMON_REQUEST_FAILED';
    httpError.status = status;
    httpError.cause = error;
    return httpError;
}

function waitForEnter(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(message, () => {
            rl.close();
            resolve();
        });
    });
}

async function getPageContent(page, timeout) {
    let lastError;

    for (let i = 0; i < 5; i++) {
        try {
            await page.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
            return await page.content();
        } catch (error) {
            lastError = error;
            await page.waitForTimeout(1000);
        }
    }

    throw lastError;
}

async function fetchWithBrowser(url, options) {
    const session = await getBrowserSession(options);
    const timeout = options.browserTimeout || 60000;
    const page = session.page;
    const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout
    });
    let html = await getPageContent(page, timeout);
    let status = response ? response.status() : undefined;

    if (status === 403 || isCloudflarePage(html)) {
        await waitForEnter(
            'Complete the Cloudflare check in the opened browser, then press Enter here to continue...'
        );
        html = await getPageContent(page, timeout);
        if (isCloudflarePage(html)) {
            throw createIncompleteCloudflareError(url);
        }
        status = 200;
    }

    return {
        status: status || 200,
        data: html
    };
}

async function getBrowserSession(options) {
    if (options.browserContext && options.browserPage) {
        return {
            context: options.browserContext,
            page: options.browserPage
        };
    }

    let playwright;
    try {
        playwright = require('playwright');
    } catch (error) {
        const missingError = new Error(
            'Browser session mode requires the playwright dependency. Run `npm install` and try again.'
        );
        missingError.code = 'PLAYWRIGHT_NOT_INSTALLED';
        throw missingError;
    }

    if (options.browserCdp) {
        let browser;
        try {
            browser = await playwright.chromium.connectOverCDP(options.browserCdp);
        } catch (error) {
            throw createCdpConnectionError(options.browserCdp, error);
        }

        const context = browser.contexts()[0] || await browser.newContext();
        const page = context.pages()[0] || await context.newPage();
        options.browser = browser;
        options.browserIsCdp = true;
        options.browserContext = context;
        options.browserPage = page;
        return { context, page };
    }

    const userDataDir = options.browserProfile || defaultBrowserProfile;
    const browserChannel = options.browserChannel || 'chrome';
    const launchOptions = {
        headless: false,
        viewport: { width: 1280, height: 900 }
    };

    if (browserChannel !== 'chromium') {
        launchOptions.channel = browserChannel;
    }

    let context;
    try {
        context = await playwright.chromium.launchPersistentContext(userDataDir, launchOptions);
    } catch (error) {
        if (options.browserChannel) {
            throw error;
        }

        console.warn('Could not launch installed Chrome, falling back to Playwright Chromium.');
        delete launchOptions.channel;
        context = await playwright.chromium.launchPersistentContext(userDataDir, launchOptions);
    }

    const page = context.pages()[0] || await context.newPage();
    options.browserContext = context;
    options.browserPage = page;

    return { context, page };
}

async function closeBrowserSession(options = {}) {
    if (options.browser) {
        if (options.browserIsCdp && options.browser.disconnect) {
            await options.browser.disconnect();
        } else {
            await options.browser.close();
        }
        delete options.browser;
        delete options.browserIsCdp;
        delete options.browserContext;
        delete options.browserPage;
        return;
    }

    if (!options.browserContext) {
        return;
    }

    await options.browserContext.close();
    delete options.browserContext;
    delete options.browserPage;
}

async function fetchManualHtml(url, options) {
    const htmlFiles = Array.isArray(options.manualHtml) ? options.manualHtml : [options.manualHtml];
    const index = options.manualHtmlIndex || 0;
    const filePath = htmlFiles[index];

    if (!filePath) {
        const error = new Error(
            `No manual HTML file supplied for ${url}. Add another --manual-html file in request order.`
        );
        error.code = 'LEMON_MANUAL_HTML_MISSING';
        throw error;
    }

    options.manualHtmlIndex = index + 1;
    return {
        status: 200,
        data: await fs.promises.readFile(filePath, 'utf8')
    };
}

async function fetchHtml(url, options = {}) {
    if (options.manualHtml) {
        return fetchManualHtml(url, options);
    }

    if (options.browserSession || options.browserCdp) {
        return fetchWithBrowser(url, options);
    }

    try {
        return await axios.get(url, { headers: requestHeaders });
    } catch (error) {
        if (isCloudflareChallenge(error)) {
            throw createCloudflareError(url);
        }
        throw createHttpError(error, url);
    }
}

const nullGames = [
    8691,
    8712,
    8752,
    8753,
    8755,
    8756,
    8758,
    8762,
    8767,
    8768,
    8769,
    8770,
    8771,
    8772,
    8773,
    8774,
    8775,
    8776,
    8777,
    8778,
    8779,
    8780,
    8781,
    8782,
    8783,
    8784,
    8785,
    8786,
    8787
];

module.exports = {
    getScraper(site) {
        return site && site === "amiga" ? scraperAmiga : scraper64
    },

    getSearchUrl(name, site) {

        let escapedName = name.toLowerCase();
        //https://www.lemon64.com/games/list.php?type=title&name=round+the+bend&submit.x=30&submit.y=11
        let queryUrl = site && site === 'amiga' ?
            `http://www.lemonamiga.com/games/list.php?list_title=${escapedName}` :
            `https://www.lemon64.com/games/list.php?list_title=${escapedName}`
        return encodeURI(queryUrl);
    },

    getGameUrl(gameId, site) {
        if (site && site === "amiga") {
            return `http://www.lemonamiga.com/games/details.php?id=${gameId}`
        } else {
            return `https://www.lemon64.com/games/details.php?ID=${gameId}`
        }
    },

    searchGame(name, site, options = {}) {
        let url = this.getSearchUrl(name, site);
        console.log('lemon-api :: searchGame name', name, 'url', url);
        let scraper = this.getScraper(site);
        return fetchHtml(url, options)
            .then(function (resp) {
                if (resp.status === 200) {
                    return scraper.getGames(resp.data)
                }
            })
            .catch(function (error) {
                throw error;
            });
    },

    async hydrateGame(g, options = {}) {
        const scraper = scraper64;
        let url = encodeURI(this.getGameUrl(g.gameId, 'c64'));
        const lemonHtml = await fetchHtml(url, options);
        g.metadata = scraper.getGameInfoFromGamePage(lemonHtml);
        this.getCoverImageByGameId(g, 'c64');
        return Promise.resolve(g);
    },

    async searchAndHydrate(name, options = {}) {
        let games = await this.searchGame(name, undefined, options);
        await Promise.allSettled(games.map((g) => {
                return this.hydrateGame(g, options);
            })
        );
        return Promise.resolve(games);
    },

    async getGameByGameId(gameId, site, options = {}) {
        let uri = encodeURI(this.getGameUrl(gameId, site));
        let scraper = this.getScraper(site);
        // console.log('Get Game By Game ID:', gameId, uri);
        return fetchHtml(uri, options)
            .then(function (resp) {
                return {
                    ...scraper.getGameDataFromPage(resp, gameId),
                    metadata: scraper.getGameInfoFromGamePage(resp)
                };
            })
            .catch(function (error) {
                throw error;
            });
    },

    async getRandomGame(options = {}) {
        let maxGameId = 8766;
        let gameId = Math.floor(Math.random() * maxGameId); // Random game ID between 1 and 10000
        while (nullGames.includes(gameId)) {
            gameId = Math.floor(Math.random() * maxGameId); // Regenerate if it's a null game
        }
        const game = await this.getGameByGameId(gameId, 'c64', options);
        if (parseInt(game.gameId) !== 1 && game.gameTitle.includes('1000 Miglia')) {
            console.log(chalk.yellow.bold(game.gameId + ' - Skipping game 1000 Miglia (this is a known issue with Lemon64)'));
            await this.getRandomGame(options);
        }
        return game;
    },

    getCoverImageByGameId(game, site) {
        let scraper = this.getScraper(site);
        scraper.appendCoverImages(game);
    },

    async closeBrowserSession(options) {
        await closeBrowserSession(options);
    }
};
