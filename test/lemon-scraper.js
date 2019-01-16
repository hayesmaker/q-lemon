const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const scraper = require('../lib/lemon-scraper');
const mockSearch1 = require("./__mocks__/mock-search-html");

describe("q-lemon :: lemon-scraper methods working as expected", () => {

  beforeEach(() => {
  });

  afterEach(() => {
  });

  it("getGameIdFromSearchPage should return correct gameTitle", () => {
    let game = scraper.getGameIdFromSearchPage(mockSearch1, "Thrust");
    expect(game.gameTitle).to.equal("Thrust");
  })

  it("getGameIdFromSearchPage should return correct gameId", () => {
    let game = scraper.getGameIdFromSearchPage(mockSearch1, "Thrust");
    expect(game.gameId).to.equal("2641");
  })

  it("getGameIdFromSearchPage should return correct gameId", () => {
    let game = scraper.getGameIdFromSearchPage(mockSearch1, "Bounder");
    expect(game).to.be.null;
  })

});