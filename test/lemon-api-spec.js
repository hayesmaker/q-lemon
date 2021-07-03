const lemonApi = require('../lib/lemon-api');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const axios = require('axios');
const scraper = require('../lib/scraper-64');


describe('q-lemon :: lemon api methods working as expected', function () {
    let sandbox;
    let game = {
      gameId: "1234"
    };

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sinon.stub(scraper, "getGames").returns([game]);
      sinon.stub(scraper, "getGameInfoFromGamePage").returns(game);
    });

    afterEach(() => {
      sandbox.restore();
      scraper.getGames.restore();
      scraper.getGameInfoFromGamePage.restore();
    });

    it("searchGame should call the correct api endpoint", () => {
      let axiosStub = sandbox.stub(axios, 'get').resolves(game);
      lemonApi.searchGame("Thrust");
      expect(axiosStub
        .calledWith(`https://www.lemon64.com/games/list.php?type=title&name=thrust`))
        .to.equal(true);
    });

    it("searchGame should call getGameFromGameId from the scraper", () => {
      sandbox.stub(axios, 'get').resolves(game);
      lemonApi.searchGame("thrust");
      expect(scraper.getGames.calledWith(game, "thrust"));
    });

    it("getGameByGameId should call the correct api endpoint", () => {
      let axiosStub = sandbox.stub(axios, 'get').resolves(game);
      lemonApi.getGameByGameId(game.gameId);
      expect(axiosStub.calledWith(`https://www.lemon64.com/games/details.php?ID=1234`)).to.equal(true)
    });

    it("getGameByGameId should call getGameInfoFromGamePage from the scraper", () => {
      sandbox.stub(axios, 'get').resolves(game);
      lemonApi.getGameByGameId(game);
      expect(scraper.getGameInfoFromGamePage.calledWith(game, "Thrust"));
    });


});