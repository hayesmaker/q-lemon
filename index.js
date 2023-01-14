#!/usr/bin/env node

// import chalk from 'chalk';
// import clear from 'clear';
// import figlet from 'figlet';

import lemonApi from './lib/lemon-api.js';

import _yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

import chalk from 'chalk';
import boxen from 'boxen';

const yargs = _yargs(hideBin(process.argv));

(async () => {
    const argv = await yargs
        .option('title', {
            alias: 't',
            type: 'string',
            demandOption: true
        })
        .option('site', {type: 'string', alias: 's', demandOption: false})
        .argv;

    let title = argv.title;
    let site = argv.site;

    // console.log('title:', title);
    // console.log('site:', site);
    // console.log("Lemon C64 Searching for %s in %s", title, site);

    //let gameId;
    let game = {
        foundGame: null,
        metadata: null,
        image: null,
        covers: [],
    };

    const greeting = chalk.white.bold(`Q-Lemon - Query Lemon64\n\nSearching for: ${title}`);

    // const greeting = `Hello, ${options.name}!`;

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

    lemonApi.searchGame(title)
        .then((res) => {
            if (res && res.length !== undefined) {
                console.log('search returned:', res);
                return res;
            }
            throw new Error("no game with title: " + title + " found");
        })
        .then(function (res) {
            if (res && res.length !== undefined) {
                let gameResult = res.find((data) => {
                    let resTitle = data.gameTitle.replace(/[^\w\s]/gi, '');
                    return resTitle.toLowerCase() === title.toLowerCase();
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
                console.log('command complete', game.foundGame.gameId);
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

})();









