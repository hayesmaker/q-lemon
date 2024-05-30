// import scraper from "../lib/scraper-64.mjs";

const chai = require('chai');
const sinonChai = require('sinon-chai');
const path = require('path');
const fs = require('fs');

const scraper = require('../lib/scraper-64.js');

const expect = chai.expect;
chai.use(sinonChai);

// const __dirname = fs.realpathSync('');
const __urlRoot = 'https://www.lemon64.com'
const mocksRoot = path.join(__dirname, '__mocks__');


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
      let mockPath = path.join(mocksRoot, 'search-page-result1.html'); // test on linux.. path maybe different
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games.length).to.equal(1);
    });

    it('getGames should give single id back if only 1 game found', () => {
      let mockPath = path.join(mocksRoot, 'search-page-result1.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games[0].gameTitle).to.equal('Round the Bend!');
    });

    it("getGames should find Thrust", () => {
      let mockPath = path.join(mocksRoot, 'search-page-result5.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games[1].gameTitle).to.equal("Thrust");
    });


    it("getGames should return 5 results", () => {
      let mockPath = path.join(mocksRoot, 'search-page-result5.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games.length).to.equal(5);
    });

    it('getGames should return 0 results', () => {
      let mockPath = path.join(mocksRoot, 'search-page-none.html');;
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games.length).to.equal(0);
    });

    it("getGameInfoFromGamePage should return game name: How To Be A Complete Bastard", () => {
      let mockPath = path.join(mocksRoot, 'game-htbacb.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.name).to.equal("How to be a Complete Bastard");
    })

    it("getGameInfoFromGamePage should return game name: Thrust", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.name).to.equal("Thrust");
    })

    it("getGameInfoFromGamePage should return game year 1986", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.year).to.equal("1986")
    })

    it("getGameInfoFromGamePage on Ark Pandora should return John Stevenson, John Meegan: ", () => {
      let mockPath = path.join(mocksRoot, 'game-ark-pandora.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.developer).to.be.an('array').that.does
          .include('John Stevenson').and.does.include('John Meegan');
    });

    it("getGameInfoFromGamePage should return publisher: Firebird", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.publisher).to.equal("Firebird");
    })

    it("getGameInfoFromGamePage should return developer Jeremy Smith", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.developer).to.be.an('array').that.does
          .include('Jeremy Smith');
    })

    it("getGameInfoFromGamePage should return musician: Rob Hubbard", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.musician).to.be.an('array').that.does
          .include('Rob Hubbard');
    })

    it("getGameInfoFromGamePage should return correct genre Arcade", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.genre).to.be.an('array').that.does.include('Arcade');
    })

    it("getGameInfoFromGamePage should return correct genre Miscellaneous", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.genres).to.be.an('array').that.does.include('Miscellaneous');
    })

    xit("getGameInfoFromGamePage should return correct review info", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.review).to.equal("9/10")
    })


    xit("getGameInfoFromGamePage should return correct magazine review info", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.magazine).to.equal("Zzap!64 - 94% (issue 13, page 16)")
    })

    it("getGameInfoFromGamePage should return correct lemonScore info", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.lemonScore).to.equal('8.09');
    });

    it("getGameInfoFromGamePage should return correct scans array length", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.scans.length).to.equal(2);
    });

    it("getGameInfoFromGamePage should return correct scan image src at 0", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.scans).to.be.an('array').that.does
          .include(__urlRoot + '/assets/images/games/tapes/medium/thrust_01.jpg');
    });

    it("getGameInfoFromGamePage should return correct scan image src at 1", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.scans).to.be.an('array').that.does
          .include(__urlRoot  + '/assets/images/games/covers/medium/thrust_01.jpg');
    });


    it("getGameInfoFromGamePage should return correct retail prices", () => {
      let mockPath = path.join(mocksRoot, 'game-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.retail).to.be.an('array').that.does
          .include('£9.99 Tape');
    });

    it("getGameInfoFromGamePage should return correct retail prices", () => {
      let mockPath = path.join(mocksRoot, 'game-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.retail).to.be.an('array').that.does
          .include('£14.99 Disk');
    });

    it("getGameInfoFromGamePage should return correct retail prices", () => {
      let mockPath = path.join(mocksRoot, 'game-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.retail.length).to.eql(3);
    });

    it("getGameInfoFromGamePage should return correct voter score 8.73", () => {
      let mockPath = path.join(mocksRoot, 'game-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.voterScore).to.equal("8.73");
    });

    it("getGameInfoFromGamePage should return 4 screenshots", () => {
      let mockPath = path.join(mocksRoot, 'game-thrust2.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.screenshots.length).to.equal(4);
    });

  });





  describe("@deprecated - given an example cover image page html", () => {

    it("getCoverImageFromPage can return the Thrust cover image src", () => {

      let mockPath = path.join(mocksRoot, 'cover-image-c64.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let image = scraper.getCoverImageFromPage(data);
      expect(image.src).to.equal("https://www.lemon64.com/covers/full/t/thrust.jpg")
    });


  });
})

