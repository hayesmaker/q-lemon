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
        .argv;

    let title = argv.title;
    let site = argv.site;
    let all = argv.all;
    let searchId = argv.id;
    let scan = argv.scan;
    let range = argv.range;
    let random = argv.random;

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

        const myGames = await lemonApi.searchAndHydrate(search);
        console.log('Search with all returned:', JSON.stringify(myGames, null, 2));

    }

    const doSearch = (search, site="64") => {
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

        lemonApi.searchGame(search, site)
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
                    return lemonApi.getGameByGameId(foundGame.gameId);
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
                // console.log("End search", err);
            })
            .finally(() => {
                console.log('Search Completed');
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
            const game = await lemonApi.getRandomGame();
            if (game) {
                console.log(chalk.green.bold('Random Game Found!'));
                console.log('Game ID:', game.gameId);
                console.log('Game Title:', game.gameTitle);
                lemonApi.getCoverImageByGameId(game, 'c64');
            } else {
                console.log(chalk.red.bold('No random game found.'));
            }
        }
        await getRandomGame();
        return;
    }

    if (scan) {

        const nullGames = [];
        const scanGameById = async (id) => {
            let game = await lemonApi.getGameByGameId(id, 'c64');
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
            return;
        }

        if (searchId) {
            await scanGameById(searchId);
            printNullGames();
            return
        }

        for (let i = 0; i <= 9000; i++) {
            // console.log('Scanning game ID:', i);
            await scanGameById(i);
        }
        printNullGames();
        return
    }


    if (!title && !searchId) {

        prompt(questions).then((answers) => {
            if (answers.searchInput && all) {
                doHydrateSearch(answers.searchInput);
                return;
            }

            if (answers.searchInput) {
                lemonApi
                    .searchGame(answers.searchInput, 'c64')
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
                                const result = await lemonApi.hydrateGame(selectedGame);
                                console.log('Search Result:', result);
                            });
                        }
                    });
            }
        });
        return;
    }

    if (searchId) {
        let gameById = await lemonApi.getGameByGameId(searchId);
        if (gameById) {
            lemonApi.getCoverImageByGameId(gameById, 'c64');
            // lemonApi.addDataByPage(game, )
            console.log('Search Result:', gameById);
        }
        return;
    }

    if (all) {
        doHydrateSearch(title);
        return;
    }

    // if qlemon is called with only title
    doSearch(title, site);
})();







