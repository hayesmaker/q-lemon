import lemonApi from "../lib/lemon-api.js";
import scraper64 from "../lib/scraper-64.js";
import chai from "chai";
import sinon from "sinon";
import sinonChai from 'sinon-chai';
import axios from "axios";

const expect = chai.expect;
chai.use(sinonChai);

describe('q-lemon :: lemon api methods working as expected', function () {
    let sandbox;
    let game = {
      gameId: "1234"
    };

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sinon.stub(scraper64, "getGames").returns([game]);
      sinon.stub(scraper64, "getGameInfoFromGamePage").returns(game);
    });

    afterEach(() => {
      sandbox.restore();
      scraper64.getGames.restore();
      scraper64.getGameInfoFromGamePage.restore();
    });

    it("searchGame should call the correct api endpoint", () => {
      let axiosStub = sandbox.stub(axios, 'get').resolves(game);
      lemonApi.searchGame("Thrust");
      expect(axiosStub).to.have.been.calledWith('https://www.lemon64.com/games/list.php?list_title=thrust')
    });

    it("searchGame should call getGameFromGameId from the scraper64", () => {
      sandbox.stub(axios, 'get').resolves(game);
      lemonApi.searchGame("thrust");
      expect(scraper64.getGames.calledWith(game, "thrust"));
    });

    it("getGameByGameId should call the correct api endpoint", () => {
      let axiosStub = sandbox.stub(axios, 'get').resolves(game);
      lemonApi.getGameByGameId(game.gameId);
      expect(axiosStub.calledWith(`https://www.lemon64.com/games/details.php?ID=1234`)).to.equal(true)
    });

    it("getGameByGameId should call getGameInfoFromGamePage from the scraper64", () => {
      sandbox.stub(axios, 'get').resolves(game);
      lemonApi.getGameByGameId(game);
      expect(scraper64.getGameInfoFromGamePage.calledWith(game, "Thrust"));
    });


});