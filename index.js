#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const args = require('yargs').argv;
const lemonApi = require('./lib/lemon-api');


console.log("Hai World! name=", args.name);

//game respo
//https://www.lemon64.com/games/details.php?ID=2641
//search resp
//https://www.lemon64.com/games/list.php?type=title&name=thrust

let name = args.name;
lemonApi.searchGame(name).then(function(res) {
    console.log('lemonApi returned', res);
});




