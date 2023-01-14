import scraper from "../lib/scraper-64.js";
import chai from "chai";
import sinonChai from 'sinon-chai';
import * as path from 'path'
import * as fs from 'fs';
import * as url from "url";
const expect = chai.expect;
chai.use(sinonChai);

const __dirname = fs.realpathSync('');
const __urlRoot = 'https://www.lemon64.com'


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
      let games = scraper.getGames(data);
      expect(games.length).to.equal(1);
    });

    it('getGames should give single id back if only 1 game found', () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result1.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games[0].gameTitle).to.equal('Round the Bend!');
    });

    it("getGames should find Thrust", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result5.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games[1].gameTitle).to.equal("Thrust");
    });


    it("getGames should return 5 results", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result5.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games.length).to.equal(5);
    });

    it('getGames should return 0 results', () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/search-page-none.html');;
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games.length).to.equal(0);
    });

    it("getGameInfoFromGamePage should return game name: How To Be A Complete Bastard", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-htbacb.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.name).to.equal("How to be a Complete Bastard");
    })

    it("getGameInfoFromGamePage should return game name: Thrust", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.name).to.equal("Thrust");
    })

    it("getGameInfoFromGamePage should return game year 1986", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.year).to.equal("1986")
    })

    it("getGameInfoFromGamePage should return publisher: Firebird", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.publisher).to.equal("Firebird");
    })

    it("getGameInfoFromGamePage should return developer Jeremy Smith", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.developer).to.equal("Jeremy Smith")
    })

    it("getGameInfoFromGamePage should return musician: Rob Hubbard", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.musician).to.equal("Rob Hubbard")
    })

    it("getGameInfoFromGamePage should return correct genre Arcade", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.genre).to.be.an('array').that.does.include('Arcade');
    })

    it("getGameInfoFromGamePage should return correct genre Miscellaneous", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.genres).to.be.an('array').that.does.include('Miscellaneous');
    })

    xit("getGameInfoFromGamePage should return correct review info", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.review).to.equal("9/10")
    })


    xit("getGameInfoFromGamePage should return correct magazine review info", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.magazine).to.equal("Zzap!64 - 94% (issue 13, page 16)")
    })

    it("getGameInfoFromGamePage should return correct lemonScore info", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.lemonScore).to.equal('N/A');
    });

    it("getGameInfoFromGamePage should return correct scans array length", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.scans.length).to.equal(2);
    });

    it("getGameInfoFromGamePage should return correct scan image src at 0", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.scans).to.be.an('array').that.does
          .include(__urlRoot + '/assets/images/games/tapes/medium/thrust_01.jpg');
    });

    it("getGameInfoFromGamePage should return correct scan image src at 1", () => {
      let mockPath = path.join(__dirname, 'test/__mocks__/game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.scans).to.be.an('array').that.does
          .include(__urlRoot  + '/assets/images/games/covers/medium/thrust_01.jpg');
    });



  });

  describe("given an example cover image page html", () => {

    it("getCoverImageFromPage can return the Thrust cover image src", () => {

      let mockPath = path.join(__dirname, 'test/__mocks__/cover-image-c64.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let image = scraper.getCoverImageFromPage(data);
      expect(image.src).to.equal("https://www.lemon64.com/covers/full/t/thrust.jpg")
    });


  });
})

