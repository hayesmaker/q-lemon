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
                description: 'Show all search results'
            })
        .argv;

    let title = argv.title;
    let site = argv.site;
    let all = argv.all;

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
        console.log('myGames::', myGames);

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
                    game.foundGame = foundGame;
                    return lemonApi.getGameByGameId(foundGame.gameId);
                    //return lemonApi.getCoverImageByGameId(foundGame.gameId);
                }
            })
            .then(function (res) {
                if (res) {
                    game.metadata = res;
                    return game;
                }
            })
            .then(function (res) {
                if (res && res.metadata && res.metadata.scans && res.metadata.scans.length > 0) {
                    lemonApi.getCoverImageByGameId(res, site);
                }
                //return lemonApi.getCoverImageByGameId(game.foundGame.gameId);
            })
            .catch(function (err) {
                // console.log("End search", err);
            })
            .finally(() => {
                console.log('Search Complete', game);
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

    if (!title) {

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
                                console.log('Result:', result);
                            });
                        }
                    });
            }
        });
        return;
    }

    doSearch(title);
})();

export default lemonApi;









