const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const scraper = require('../lib/lemon-scraper');
const mockSearch1 = require("./__mocks__/mock-search-html");
const mockThrustPage = require("./__mocks__/mock-thrust-page");
const mockCoverImagePage = require("./__mocks__/mock-cover-image-page");

describe("q-lemon :: lemon-scraper methods working as expected", () => {

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
    let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    expect(game.name).to.equal("Thrust")
  })

  it("getGameInfoFromGamePage should return correct year info", () => {
    let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    expect(game.year).to.equal("1986")
  })

  it("getGameInfoFromGamePage should return correct publisher info", () => {
    let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    expect(game.publisher).to.equal("Firebird")
  })

  it("getGameInfoFromGamePage should return correct developer", () => {
    let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    expect(game.developer).to.equal("Jeremy Smith")
  })

  it("getGameInfoFromGamePage should return correct musician info", () => {
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

describe("q-lemon :: lemon-scraper :: given an example cover image page html", () => {

  it("getCoverImageFromPage can return the image src", () => {
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

//https://www.lemon64.com/covers/thumbs/t/thrust_thumb.jpg
//https://www.lemon64.com/covers/full/t/thrust.jpg
  //https://www.lemon64.com/games/view_cover.php?gameID=2641


