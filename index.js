#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');

// import inquirer from "inquirer";
// import chalk from 'chalk';
// import boxen from 'boxen';

// import lemonApi from './lib/lemon-api.mjs';
const package = require('./package.json');
const lemonApi = require('./lib/lemon-api.js');

// const argv = yargs(hideBin(process.argv)).argv
// const yargs = _yargs(hideBin(process.argv));

(async () => {

    const argv = yargs(hideBin(process.argv))
        .option('scan', {
          alias: 'sc',
          type: 'boolean',
          demandOption: false,
          description: 'Scan Lemon site for games',
        })
        .option('title',
            {
                alias: 't',
                type: 'string',
                demandOption: false,
                description: 'Title or part of game title to search for'
            })
        .option(
            'site',
            {
                type: 'string',
                alias: 's',
                demandOption: false,
                description: 'Current supported sites: lemon64 (64) and lemonamiga (amiga)'
            })
        .option(
            'all',
            {
                type: 'boolean',
                alias: 'a',
                demandOption: false,
                description: 'Grab data for all search results'
            })
        .option(
            'id',
            {
                type: 'string',
                alias: 'i',
                demandOption: false,
                description: 'Search by Lemon game id eg: `qlemon -i 2641`'
            })
        .option(
            'random',
            {
                type: 'boolean',
                alias: 'ra',
                demandOption: false,
                description: 'Get a random game from Lemon64'
            }
        )
        .option(
            'range',
            {
                type: 'string',
                alias: 'r',
                demandOption: false,
                description: 'Range of game IDs to scan, eg: `qlemon -sc -r 100-200`'
            }
        )
        .option(
            'browser-session',
            {
                type: 'boolean',
                alias: 'bs',
                demandOption: false,
                description: 'Use a visible Playwright browser session for Lemon64 requests'
            }
        )
        .option(
            'browser-profile',
            {
                type: 'string',
                demandOption: false,
                description: 'Persistent browser profile directory for --browser-session'
            }
        )
        .option(
            'browser-timeout',
            {
                type: 'number',
                demandOption: false,
                description: 'Browser navigation timeout in milliseconds for --browser-session'
            }
        )
        .option(
            'browser-channel',
            {
                type: 'string',
                demandOption: false,
                default: 'chrome',
                description: 'Playwright browser channel for --browser-session, eg: chrome or chromium'
            }
        )
        .option(
            'browser-cdp',
            {
                type: 'string',
                demandOption: false,
                default: 'http://127.0.0.1:9222',
                description: 'Connect to an existing Chrome remote debugging endpoint, eg: http://127.0.0.1:9222'
            }
        )
        .option(
            'manual-html',
            {
                type: 'string',
                array: true,
                demandOption: false,
                description: 'Use saved Lemon64 HTML files instead of fetching. Repeat in request order.'
            }
        )
        .argv;

    let title = argv.title;
    let site = argv.site;
    let all = argv.all;
    let searchId = argv.id;
    let scan = argv.scan;
    let range = argv.range;
    let random = argv.random;
    const requestOptions = {
        browserSession: argv.browserSession,
        browserProfile: argv.browserProfile,
        browserTimeout: argv.browserTimeout,
        browserChannel: argv.browserChannel,
        browserCdp: argv.browserCdp,
        manualHtml: argv.manualHtml,
        manualHtmlIndex: 0,
    };

/*    let game = {
        foundGame: null,
        metadata: null,
        image: null,
        covers: [],
    };*/

    const doHydrateSearch = async (search) => {

        const greeting = chalk.white.bold(`Q-Lemon - Query Lemon\n\nHydrate Search: ${search}`);
        const boxenOptions = {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            borderColor: "yellow",
            backgroundColor: "#5533ff",
            dimBorder: true,
        };
        const msgBox = boxen(greeting, boxenOptions);
        console.log(msgBox);

        const myGames = await lemonApi.searchAndHydrate(search, requestOptions);
        console.log('Search with all returned:', JSON.stringify(myGames, null, 2));

    }

    const handleError = (err) => {
        if (err && err.message) {
            console.error(chalk.red.bold(err.message));
            return;
        }
        console.error(chalk.red.bold('Search failed'));
    }

    const closeBrowserSession = async () => {
        await lemonApi.closeBrowserSession(requestOptions).catch(handleError);
    }

    const doSearch = async (search, site="64") => {
        console.log('doSearch', search, site);

        const greeting = chalk.white.bold(`Query Lemon ${site}\n\nSearching for: ${search}\n\nPowered by q-Lemon v${package.version}`);
        const boxenOptions = {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            borderColor: "yellow",
            backgroundColor: "#5533ff",
            dimBorder: true,
        };
        const msgBox = boxen(greeting, boxenOptions);
        console.log(msgBox);

        await lemonApi.searchGame(search, site, requestOptions)
            .then((res) => {
                if (res && res.length !== undefined) {
                    console.log('search returned:', res);
                    return res;
                }
                throw new Error("no game with title: " + search + " found");
            })
            .then(function (res) {
                if (res && res.length !== undefined) {
                    let gameResult = res.find((data) => {
                        let resTitle = data.gameTitle.replace(/[^\w\s]/gi, '');
                        return resTitle.toLowerCase() === search.toLowerCase();
                    })
                    if (gameResult) {
                        return gameResult;
                    }
                }
            })
            .then(function (foundGame) {
                if (foundGame) {
                    return lemonApi.getGameByGameId(foundGame.gameId, site, requestOptions);
                }
            })
            .then(function (res) {
                if (res) {
                    lemonApi.getCoverImageByGameId(res, 'c64');
                    console.log('Searched Title Match!', res);
                    return res;
                }
            })
            .catch(function (err) {
                handleError(err);
            })
            .finally(async () => {
                console.log('Search Completed');
                await closeBrowserSession();
            })
    }

    const prompt = inquirer.createPromptModule();
    const questions = [
        {
            type: 'input',
            name: 'searchInput',
            message: 'Type a game to search for'
        }
    ];

    if (random) {

        const getRandomGame = async () => {
            const game = await lemonApi.getRandomGame(requestOptions);
            if (game) {
                console.log(chalk.green.bold('Random Game Found!'));
                console.log('Game ID:', game.gameId);
                console.log('Game Title:', game.gameTitle);
                lemonApi.getCoverImageByGameId(game, 'c64');
            } else {
                console.log(chalk.red.bold('No random game found.'));
            }
        }
        await getRandomGame().catch(handleError).finally(closeBrowserSession);
        return;
    }

    if (scan) {

        const nullGames = [];
        const scanGameById = async (id) => {
            let game = await lemonApi.getGameByGameId(id, 'c64', requestOptions).catch((err) => {
                handleError(err);
                throw err;
            });
            if (game && game.gameTitle) {

                if (parseInt(game.gameId) !== 1 && game.gameTitle.includes('1000 Miglia')) {
                    console.log(chalk.yellow.bold(game.gameId + ' - Skipping game 1000 Miglia (this is a known issue with Lemon64)'));
                    return;
                }

                console.log('Game by ID:', game.gameId, game.gameTitle);
                // lemonApi.getCoverImageByGameId(game, 'c64');
            } else {
                console.log('No game found with ID:', id);
                nullGames.push(id);
            }
        }

        const printNullGames = () => {
            if (nullGames.length > 0) {
                console.log(chalk.red.bold('No games found for the following IDs:'));
                nullGames.forEach((id) => {
                    console.log(chalk.red(id));
                });
            } else {
                console.log(chalk.green.bold('All game IDs scanned successfully.'));
            }
        }

        if (range) {
            const [start, end] = range.split('-').map(Number);
            if (isNaN(start) || isNaN(end) || start < 0 || end < start) {
                console.error('Invalid range specified. Please use a valid range like 100-200.');
                return;
            }
            console.log(`Scanning games from ID ${start} to ${end}...`);
            for (let i = start; i <= end; i++) {
                await scanGameById(i);
            }
            printNullGames();
            await closeBrowserSession();
            return;
        }

        if (searchId) {
            await scanGameById(searchId);
            printNullGames();
            await closeBrowserSession();
            return
        }

        for (let i = 0; i <= 9000; i++) {
            // console.log('Scanning game ID:', i);
            await scanGameById(i);
        }
        printNullGames();
        await closeBrowserSession();
        return
    }


    if (!title && !searchId) {

        prompt(questions).then((answers) => {
            if (answers.searchInput && all) {
                doHydrateSearch(answers.searchInput).catch(handleError).finally(closeBrowserSession);
                return;
            }

            if (answers.searchInput) {
                lemonApi
                    .searchGame(answers.searchInput, 'c64', requestOptions)
                    .then((res) => {
                        let foundGames = res;
                        if (foundGames && foundGames.length) {
                            const choices = res.map((d) => {
                               return d.gameTitle;
                            });
                            const prompt2 = inquirer.createPromptModule();
                            const questions = [
                                {
                                    type: 'list',
                                    name: 'searchList',
                                    message: 'Select a game',
                                    choices,
                                }
                            ]

                            prompt2(questions).then(async (answers) => {
                                console.log('selected', answers.searchList);
                                const selected = answers.searchList;
                                const selectedGame = foundGames.find((d) => {
                                    return d.gameTitle === selected;
                                });
                                const result = await lemonApi.hydrateGame(selectedGame, requestOptions);
                                console.log('Search Result:', result);
                            }).catch(handleError);
                        }
                    })
                    .catch(handleError)
                    .finally(closeBrowserSession);
            }
        });
        return;
    }

    if (searchId) {
        let gameById = await lemonApi.getGameByGameId(searchId, site, requestOptions).catch(handleError).finally(closeBrowserSession);
        if (gameById) {
            lemonApi.getCoverImageByGameId(gameById, 'c64');
            // lemonApi.addDataByPage(game, )
            console.log('Search Result:', gameById);
        }
        return;
    }

    if (all) {
        await doHydrateSearch(title).catch(handleError).finally(closeBrowserSession);
        return;
    }

    // if qlemon is called with only title
    await doSearch(title, site);
})();







