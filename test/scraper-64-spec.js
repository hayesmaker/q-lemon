const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const scraper = require('../lib/scraper-64');
const mockSearch1 = require("./__mocks__/mock-search-html");
const mockThrustPage = require("./__mocks__/mock-thrust-page");
const mockCoverImagePage = require("./__mocks__/mock-cover-image-page");

describe("q-lemon :: scraper-64", () => {
  describe("methods working as expected", () => {

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

    it("getGameInfoFromGamePage should return game name: Thrust", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.name).to.equal("Thrust")
    })

    it("getGameInfoFromGamePage should return game year 1986", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.year).to.equal("1986")
    })

    it("getGameInfoFromGamePage should return publisher: Firebird", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.publisher).to.equal("Firebird")
    })

    it("getGameInfoFromGamePage should return developer Jeremy Smith", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.developer).to.equal("Jeremy Smith")
    })

    it("getGameInfoFromGamePage should return musician: Rob Hubbard", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.musician).to.equal("Rob Hubbard")
    })

    it("getGameInfoFromGamePage should return correct genre info", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.genre).to.equal("Arcade")
    })

    xit("getGameInfoFromGamePage should return correct review info", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.review).to.equal("9/10")
    })


    it("getGameInfoFromGamePage should return correct magazine review info", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      expect(game.magazine).to.equal("Zzap!64 - 94% (issue 13, page 16)")
    })

    xit("getGameInfoFromGamePage should return correct lemonScore info", () => {
      let game = scraper.getGameInfoFromGamePage(mockThrustPage);
      console.log(game.html);
      expect(game.lemonScore).to.equal(8.1)
    })
  });

  describe("given an example cover image page html", () => {

    it("getCoverImageFromPage can return the Thrust cover image src", () => {
      let image = scraper.getCoverImageFromPage(mockCoverImagePage);
      expect(image.src).to.equal("https://www.lemon64.com/covers/full/t/thrust.jpg")
    })

    it("getCoverImageFromPage returns the image width", () => {
      let image = scraper.getCoverImageFromPage(mockCoverImagePage);
      expect(image.width).to.equal('284')
    })

    it("getCoverImageFromPage returns the image height", () => {
      let image = scraper.getCoverImageFromPage(mockCoverImagePage);
      expect(image.height).to.equal('449')
    })

  });
})

