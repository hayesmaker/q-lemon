import scraper from "../lib/scraper-64.js";
import chai from "chai";
import sinonChai from 'sinon-chai';
import * as path from 'path'
import * as fs from 'fs';
const expect = chai.expect;
chai.use(sinonChai);

const __dirname = fs.realpathSync('');


// import mockSearch from './__mocks__/mock-search-html';
// const mockThrustPage = require("./__mocks__/mock-thrust-page");

describe("q-lemon :: scraper-64", () => {
  describe("methods working as expected", () => {

    beforeEach(() => {
      //sinon.stub(console, "log");
    });

    afterEach(() => {
      //console.log.restore();
    });

    it('getGames should give single id back if only 1 game found', () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result1.html'); // test on linux.. path maybe different
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data, "Round the bend");
      console.log('games', games);
      expect(games.length).to.equal(1);
    });

    it('getGames should give single id back if only 1 game found', () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result1.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data, "Round the bend");
      expect(games[0].gameTitle).to.equal('Round the Bend!');
    });

    it("getGames should find Thrust", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result5.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data, "Thrust");
      expect(games[1].gameTitle).to.equal("Thrust");
    });


    it("getGames should return 5 results", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result5.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data, "Thrust");
      expect(games.length).to.equal(5);
    });

    it('getGames should return 0 results', () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-none.html');;
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data, "Thrust");
      expect(games.length).to.equal(0);
    });

    // it("getGameInfoFromGamePage should return game name: Thrust", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.name).to.equal("Thrust")
    // })

    // it("getGameInfoFromGamePage should return game year 1986", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.year).to.equal("1986")
    // })

    // it("getGameInfoFromGamePage should return publisher: Firebird", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.publisher).to.equal("Firebird")
    // })

    // it("getGameInfoFromGamePage should return developer Jeremy Smith", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.developer).to.equal("Jeremy Smith")
    // })

    // it("getGameInfoFromGamePage should return musician: Rob Hubbard", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.musician).to.equal("Rob Hubbard")
    // })

    // it("getGameInfoFromGamePage should return correct genre info", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.genre).to.equal("Arcade")
    // })

    // xit("getGameInfoFromGamePage should return correct review info", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.review).to.equal("9/10")
    // })


    // it("getGameInfoFromGamePage should return correct magazine review info", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   expect(game.magazine).to.equal("Zzap!64 - 94% (issue 13, page 16)")
    // })

    // xit("getGameInfoFromGamePage should return correct lemonScore info", () => {
    //   let game = scraper.getGameInfoFromGamePage(mockThrustPage);
    //   console.log(game.html);
    //   expect(game.lemonScore).to.equal(8.1)
    // })
  });

  describe("given an example cover image page html", () => {

    it("getCoverImageFromPage can return the Thrust cover image src", () => {

      let mockPath = path.join(__dirname, 'test/__mocks__/cover-image-c64.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let image = scraper.getCoverImageFromPage(data);
      expect(image.src).to.equal("https://www.lemon64.com/covers/full/t/thrust.jpg")
    })

    it("getCoverImageFromPage returns the image width", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/cover-image-c64.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let image = scraper.getCoverImageFromPage(data);
      expect(image.width).to.equal('640')
    })

    it("getCoverImageFromPage returns the image height", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/cover-image-c64.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let image = scraper.getCoverImageFromPage(data);
      expect(image.height).to.equal('1005')
    })

  });
})

