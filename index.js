#!/usr/bin/env node

// import chalk from 'chalk';
// import clear from 'clear';
// import figlet from 'figlet';

import lemonApi from './lib/lemon-api.js';

import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));

(async () => {
  const argv = await yargs
    .option('name', { type: 'string', require: true })
    .option('site', { type: 'string', require: false })
    .alias('n', 'name')
    .alias('s', 'site')
    .argv;

  let name = argv.name;
  let site = argv.site;

  console.log('name:', name);
  console.log('site:', site);

  console.log("Lemon C64 Searching for %s in %s", name, site);

  //let gameId;
  let game = {
    foundGame: null,
    metadata: null,
    image: null
  };

  lemonApi.searchGame(name)
      .then((res) => {
        console.log('lemon search game', res);
        if (res.length !== 0) {
          return res;
        } else {
          throw new Error("no game with " + name + " found");
        }
      })
      .then(function(res) {
        if (res && res.length) {
          let gameResult = res.find((data) => {
            let title = data.gameTitle.replace(/[^\w\s]/gi, '');
            return title.toLowerCase() === name.toLowerCase();
          })
          if (gameResult) {
            return gameResult;
          }
        }
      })
      .then(function(foundGame) {
        console.log("Found Game: ", foundGame);
        if (foundGame) {
          game.foundGame = foundGame;
          return lemonApi.getGameByGameId(foundGame.gameId);
          //return lemonApi.getCoverImageByGameId(foundGame.gameId);
        }
      })
      .then(function(res) {
        if (res) {
          game.metadata = res;
          console.log('command complete', game.foundGame.gameId);
          return true;
        }
      })
      .then(function(res) {
        if (res) {
          return lemonApi.getCoverImageByGameId(game.foundGame.gameId);
        }
      })
      .then(function(res) {
        if (res) {
          game.image = res;
        }
      })
      .catch(function(err) {
        console.log("End search", err);
      }).finally(() => {
    console.log('Search Complete', game);
  })

})();









