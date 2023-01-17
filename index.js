#!/usr/bin/env node

import _yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

import inquirer from "inquirer";
import chalk from 'chalk';
import boxen from 'boxen';
import lemonApi from './lib/lemon-api.js';

const yargs = _yargs(hideBin(process.argv));

(async () => {
    const argv = await yargs
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
                description: 'Support for multiple game sites: coming soon'
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
        .argv;

    let title = argv.title;
    let site = argv.site;
    let all = argv.all;
    let searchId = argv.id;

    let game = {
        foundGame: null,
        metadata: null,
        image: null,
        covers: [],
    };

    const doHydrateSearch = async (search) => {

        const greeting = chalk.white.bold(`Q-Lemon - Query Lemon64\n\nHydrate Search: ${search}`);
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

    const doSearch = (search) => {

        const greeting = chalk.white.bold(`Q-Lemon - Query Lemon64\n\nSearching for: ${search}`);
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

        lemonApi.searchGame(search)
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
    doSearch(title);
})();

export default lemonApi;









