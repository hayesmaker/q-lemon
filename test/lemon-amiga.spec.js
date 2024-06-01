// import scraper from "../lib/scraper-64.mjs";

const chai = require('chai');
const sinonChai = require('sinon-chai');
const path = require('path');
const fs = require('fs');

const scraper = require('../lib/scraper-amiga.js');

const expect = chai.expect;
chai.use(sinonChai);

// const __dirname = fs.realpathSync('');
const __urlRoot = 'https://www.lemonamiga.com'
const mocksRoot = path.join(__dirname, '__mocks__');


// import mockSearch from './__mocks__/mock-search-html';
// const mockThrustPage = require("./__mocks__/mock-thrust-page");

describe("q-lemon :: Lemon Amiga scraper", () => {
  describe("methods working as expected", () => {

    beforeEach(() => {
      //sinon.stub(console, "log");
    });

    afterEach(() => {
      //console.log.restore();
    });

    it('getGames should find 2 search results', () => {
      let mockPath = path.join(mocksRoot, 'amiga-search1.html'); // test on linux.. path maybe different
      const data = fs.readFileSync(mockPath, 'utf8');

      let games = scraper.getGames(data);
      expect(games.length).to.equal(2);
    });

    it('getGames should find Postman Pat as 1st Game', () => {
      let mockPath = path.join(mocksRoot, 'amiga-search1.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games[0].gameTitle).to.equal('Postman Pat');
    });

    it("getGames should find Postman Pat III as 2nd Game", () => {
      let mockPath = path.join(mocksRoot, 'amiga-search1.html');
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games[1].gameTitle).to.equal("Postman Pat III");
    });

    it('getGames should return 0 results', () => {
      let mockPath = path.join(mocksRoot, 'amiga-search0.html');;
      const data = fs.readFileSync(mockPath, 'utf8');
      let games = scraper.getGames(data);
      expect(games.length).to.equal(0);
    });

    it("getGameInfoFromGamePage should return game name: Postman Pat", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-postmanpat.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.name).to.equal("Postman Pat");
    });

    it("getGameInfoFromGamePage should return game year 1989", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-postmanpat.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.year).to.equal("1989");
    })

    it("getGameInfoFromGamePage publisher should be Alternative Software", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-postmanpat.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.publisher).to.equal('Alternative Software');
    });

    it("getGameInfoFromGamePage developer should be Mark Mason", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-postmanpat.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.developer).to.be.an('array').that.does
        .include('Mark Mason');
    });

    it("getGameInfoFromGamePage should return musician: Chris Hülsbeck", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.musician).to.be.an('array').that.does
        .include('Chris Hülsbeck');
    });

    it("getGameInfoFromGamePage should return genres: 'Shoot\'em Up'", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.genres).to.be.an('array').that.does
        .include('Shoot\'em Up');
    });

    it("getGameInfoFromGamePage should return correct genre Arcade", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-postmanpat.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.genres).to.be.an('array').that.does.include('Arcade');
    })

    it("getGameInfoFromGamePage should return correct genre Miscellaneous", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-postmanpat.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.genres).to.be.an('array').that.does.include('Arcade');
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
      let mockPath = path.join(mocksRoot, 'amiga-page-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.lemonScore).to.equal('8.46');
    });

    it("getGameInfoFromGamePage should return correct scans array length", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.scans.length).to.equal(2);
    });

    it("getGameInfoFromGamePage should return cannon fodder cover image", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-cannon.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);

      expect(game.scans).to.be.an('array').that.does
        .include(__urlRoot + '/games/media/boxes/full/cannon_fodder_01.jpg');
    });

    it("getGameInfoFromGamePage should return correct number of screenshots", () => {
      let mockPath = path.join(mocksRoot, 'amiga-page-cannon.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.screenshots).to.be.an('array');
      expect(game.screenshots.length).to.equal(21);
    });


    xit("getGameInfoFromGamePage should return correct retail prices", () => {
      let mockPath = path.join(mocksRoot, 'game-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.retail).to.be.an('array').that.does
        .include('£9.99 Tape');
    });

    xit("getGameInfoFromGamePage should return correct retail prices", () => {
      let mockPath = path.join(mocksRoot, 'game-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.retail).to.be.an('array').that.does
        .include('£14.99 Disk');
    });

    xit("getGameInfoFromGamePage should return correct retail prices", () => {
      let mockPath = path.join(mocksRoot, 'game-turrican.html');
      const data = fs.readFileSync(mockPath, 'utf8');

      let game = scraper.getGameInfoFromGamePage(data);
      expect(game.retail.length).to.eql(3);
    });

  });

});

