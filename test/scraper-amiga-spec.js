const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const scraper = require('../lib/scraper-amiga');
const mockSearch1 = require("./__mocks__/mock-amiga-search-page");
const mockRTypePage = require("./__mocks__/mock-amiga-rtype-page");
const mockCoverImagePage = require("./__mocks__/mock-amiga-cover-image");

describe("q-lemon :: scraper-amiga methods working as expected", () => {

  beforeEach(() => {
    //sinon.stub(console, "log");
  });

  afterEach(() => {
    //console.log.restore();
  });

  it("getGameIdFromSearchPage should return correct gameTitle", () => {
    let games = scraper.getGameIdFromSearchPage(mockSearch1, "Thrust");
    expect(games[1].gameTitle).to.equal("Thrust");
  });

  it("getGameIdFromSearchPage should return correct gameId", () => {
    let games = scraper.getGameIdFromSearchPage(mockSearch1, "Thrust");
    expect(games[1].gameId).to.equal("2641");
  });

  it("getGameIdFromSearchPage should return 5 results", () => {
    let games = scraper.getGameIdFromSearchPage(mockSearch1, "Thrust");
    expect(games.length).to.equal(5);
  });


  /*
  getGameInfoFromGamePage
   */

  it("getGameInfoFromGamePage should return correct game name info", () => {
    let game = scraper.getGameInfoFromGamePage(mockRTypePage);
    expect(game.name).to.equal("Thrust")
  })

  it("getGameInfoFromGamePage should return correct year info", () => {
    let game = scraper.getGameInfoFromGamePage(mockRTypePage);
    expect(game.year).to.equal("1986")
  })

  it("getGameInfoFromGamePage should return correct publisher info", () => {
    let game = scraper.getGameInfoFromGamePage(mockRTypePage);
    expect(game.publisher).to.equal("Firebird")
  })

  it("getGameInfoFromGamePage should return correct developer", () => {
    let game = scraper.getGameInfoFromGamePage(mockRTypePage);
    expect(game.developer).to.equal("Jeremy Smith")
  })

  it("getGameInfoFromGamePage should return correct musician info", () => {
    let game = scraper.getGameInfoFromGamePage(mockRTypePage);
    expect(game.musician).to.equal("Rob Hubbard")
  })

  it("getGameInfoFromGamePage should return correct genre info", () => {
    let game = scraper.getGameInfoFromGamePage(mockRTypePage);
    expect(game.genre).to.equal("Arcade")
  })

  it("getGameInfoFromGamePage should return correct magazine review info", () => {
    let game = scraper.getGameInfoFromGamePage(mockRTypePage);
    expect(game.magazine).to.equal("Zzap!64 - 94% (issue 13, page 16)")
  })
});