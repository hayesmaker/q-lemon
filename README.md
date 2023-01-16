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

`qlemon --title="Thrust"`

- Where Thrust can be any game - search is not case sensitive.

### Known Issues:
- Where title includes a "the", lemon normally appends this to the
end of the title string: eg: Last Ninja, The.  The title matcher has
an issue finding these games, though search results should still be fine.

