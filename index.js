#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const args = require('yargs').argv;
const lemonApi = require('./lib/lemon-api');

let name = args.name;

console.log("Lemon C64 Searching for %s", name);

lemonApi.searchGame(name)
  .then(lemonApi.getGameByGameId)
  .then(function(res) {
    console.log("what's here", res)
  });

