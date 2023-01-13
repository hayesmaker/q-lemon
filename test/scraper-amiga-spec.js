// const chai = require('chai');
// const expect = chai.expect;
// const sinon = require('sinon');
// const scraper = require('../lib/scraper-amiga');
// const mockSearch1 = require("./__mocks__/mock-amiga-search-page");
// const mockRTypePage = require("./__mocks__/mock-amiga-rtype-page");
// const mockCoverImagePage = require("./__mocks__/mock-amiga-cover-image");
// const mockPageWithCover = require("./__mocks__/amiga-game-with-boxart");
// const mockCannonFodderImage = require("./__mocks__/cannon-fodder-cd32-image");

/*
describe("q-lemon :: scraper-amiga ", () => {
  describe("getGameIdFromSearchPage works as expected", () => {

    beforeEach(() => {
      //sinon.stub(console, "log");
    });

    afterEach(() => {
      //console.log.restore();
    });

    it("getGameIdFromSearchPage should return gameTitle : R-Type ", () => {
      let games = scraper.getGameIdFromSearchPage(mockSearch1);
      expect(games[4].gameTitle).to.equal("R-Type");
    });

    it("getGameIdFromSearchPage should return correct gameId - 918", () => {
      let games = scraper.getGameIdFromSearchPage(mockSearch1);
      expect(games[4].gameId).to.equal("918");
    });

    it("getGameIdFromSearchPage should return 6 results", () => {
      let games = scraper.getGameIdFromSearchPage(mockSearch1);
      expect(games.length).to.equal(6);
    });
  });

  describe("getGameInfoFromGamePage works as expected", () => {
    it("should return correct game name : Retro Wars - Episode IV 1/4", () => {
      let game = scraper.getGameInfoFromGamePage(mockPageWithCover);
      expect(game.name).to.equal("Retro Wars - Episode IV 1/4")
    });

    it("should return correct game name : R-Type", () => {
      let game = scraper.getGameInfoFromGamePage(mockRTypePage);
      expect(game.name).to.equal("R-Type")
    });

    it("getGameInfoFromGamePage should return correct year info", () => {
      let game = scraper.getGameInfoFromGamePage(mockRTypePage);
      expect(game.year).to.equal("1989")
    });

    it("getGameInfoFromGamePage should return correct publisher info", () => {
      let game = scraper.getGameInfoFromGamePage(mockRTypePage);
      expect(game.publisher).to.equal("Electric Dreams")
    });

    it("getGameInfoFromGamePage should return correct developer", () => {
      let game = scraper.getGameInfoFromGamePage(mockRTypePage);
      expect(game.developer).to.equal("Factor 5, Rainbow Arts")
    });

    it("getGameInfoFromGamePage should return correct musician info", () => {
      let game = scraper.getGameInfoFromGamePage(mockRTypePage);
      expect(game.musician.includes('Chris')).to.equal(true)
    });

    it("getGameInfoFromGamePage should return correct genre info", () => {
      let game = scraper.getGameInfoFromGamePage(mockRTypePage);
      expect(game.genre).to.equal("Shoot'em Up - H-Scrolling")
    });
  });

  describe("getCoverImageFromPage worsks as expected", () => {

    it("return the cannon fodder image src", () => {
      let image = scraper.getCoverImageFromPage(mockCoverImagePage);
      expect(image.src).to.equal(
          "http://www.lemonamiga.com/games/boxes/full/cannon_fodder_01.jpg"
      )
    });

    it("returns the image width", () => {
      let image = scraper.getCoverImageFromPage(mockCoverImagePage);
      expect(image.width).to.equal('713')
    });

    it("returns the image height", () => {
      let image = scraper.getCoverImageFromPage(mockCoverImagePage);
      expect(image.height).to.equal('923')
    });

    xit("return the cannon fodder image src", () => {
      let image = scraper.getCoverImageFromPage(mockCannonFodderImage);
      expect(image.src).to.equal(
        "http://www.lemonamiga.com/games/boxes/full/cannon_fodder_01.jpg"
      )
    });

    xit("returns the image width", () => {
      let image = scraper.getCoverImageFromPage(mockCannonFodderImage);
      expect(image.width).to.equal('713')
    });

    xit("returns the image height", () => {
      let image = scraper.getCoverImageFromPage(mockCannonFodderImage);
      expect(image.height).to.equal('923')
    });
  })
});
*/

