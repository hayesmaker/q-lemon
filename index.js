#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const args = require('yargs').argv;
const lemonApi = require('./lib/lemon-api');

let name = args.name;
let site = args.site;

console.log("Lemon C64 Searching for %s in %s", name, site);

let gameId;
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
;

module.exports = lemonApi;