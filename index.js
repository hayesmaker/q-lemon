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
  metadata: null,
  image: null
};


lemonApi.searchGame(name)
  .then((res) => {
    if (res.length === 1) {
      gameId = res[0].gameId;
    } else if (res.length > 1) {
      console.log("multiple games found: ", res);
      return null;
    } else {
      throw new Error("no game with " + name + " found");
    }
    return lemonApi.getGameByGameId(gameId);
  })

  .then(function(res) {
    game.metadata = res;
  })
  .then(function() {
    return lemonApi.getCoverImageByGameId(gameId)

  })
  .then(function(res) {
    game.image = res;
    console.log('command complete', game);
    return game;
  })
  .catch(function(err) {
    console.log("End search", err);
  })
;

module.exports = lemonApi;