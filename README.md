# q-lemon
cli tool for querying lemon 64 and returning info on specific games

## Prerequisites
Node and NPM installed: https://nodejs.org/en/ - The installer installs
both.

## install
for gloabal cli usage 
`npm i q-lemon -g`


## usage
from anywhere run

`qlemon`
- A Prompt will ask you, type a game title, or part of title to search

- Next select the game from the search results displayed

`qlemon --title=Thrust`
- To search by title from the command line, add --title (or -t flag) and add the title. Quotes
are only required if the title is more than one word.

`qlemon -t="last ninja"`
- multiple word titles should be enclosed in quotes

`qlemon --title=thrust --all`
- Search by title and display all search results in your console.