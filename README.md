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

## Lemon64 Cloudflare checks

Lemon64 may return a Cloudflare human check for normal HTTP requests. The recommended workaround is CDP mode, which connects q-lemon to a Chrome instance you start yourself.

In one terminal, start Chrome:

`npm run chrome:cdp`

Complete any Cloudflare check in that Chrome window and leave Chrome open.

In another terminal, run q-lemon with CDP:

`qlemon --title=thrust`

- By default, q-lemon connects to `http://127.0.0.1:9222`, the Chrome instance started by `npm run chrome:cdp`.
- If prompted, complete the Cloudflare check in Chrome, wait for Lemon64 to finish loading, then press Enter in the q-lemon terminal.
- The Chrome profile is stored at `~/.qlemon-real-chrome`, so session cookies can be reused across runs.

If you need a different CDP endpoint:

`qlemon --title=thrust --browser-cdp=http://127.0.0.1:9333`

Equivalent manual Chrome command:

`google-chrome --remote-debugging-port=9222 --user-data-dir="$HOME/.qlemon-real-chrome"`

### Browser Session Mode

`qlemon --title=thrust --browser-session`
- Use a visible Playwright-launched browser session with installed Chrome for Lemon64 requests. This is less reliable than CDP mode if Cloudflare rejects automated browser contexts.

`qlemon --title=thrust --browser-session --browser-profile=/path/to/profile`
- Reuse a specific persistent browser profile directory. If omitted, q-lemon uses `~/.qlemon-browser-session`.

`qlemon --title=thrust --browser-session --browser-channel=chromium`
- Override the Playwright browser channel. The default is `chrome`, which uses your installed Google Chrome.

### Manual HTML Mode

`qlemon --title=thrust --manual-html=search.html --manual-html=details.html`
- Parse saved Lemon64 HTML files instead of fetching from Lemon64. Files are consumed in request order, so title lookup needs the search results page first and the selected game details page second.

`qlemon --id=2526 --manual-html=details.html`
- Parse a saved game details page for an ID lookup.
