// import lemonApi from "../lib/lemon-api.mjs";
// import scraper64 from "../lib/scraper-64.mjs";

const lemonApi = require('../lib/lemon-api.js');
const scraper64 = require('../lib/scraper-64.js');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const axios = require('axios');
const os = require('os');
const path = require('path');
const fs = require('fs');

/*
import chai from "chai";
import sinon from "sinon";
import sinonChai from 'sinon-chai';
import axios from "axios";
import path from "path";
import fs from "fs";*/

const expect = chai.expect;
chai.use(sinonChai);

describe('q-lemon :: lemon api methods working as expected', function () {
    let sandbox;
    let game = {
      gameId: 1234
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

    it("searchGame should call the correct api endpoint", async () => {
      let axiosStub = sandbox.stub(axios, 'get').resolves({ status: 200, data: game });
      await lemonApi.searchGame("Thrust");
      expect(axiosStub).to.have.been.calledWith('https://www.lemon64.com/games/list.php?list_title=thrust')
    });

    it("searchGame should call getGames from scraper64", async () => {
      sandbox.stub(axios, 'get').resolves({ status: 200, data: game });
      await lemonApi.searchGame("thrust");
      expect(scraper64.getGames).to.have.been.calledWith(game);
    });

    it("searchGame should report Cloudflare challenges clearly", async () => {
      sandbox.stub(console, 'error');
      sandbox.stub(axios, 'get').rejects({
        response: {
          status: 403,
          headers: {
            'cf-mitigated': 'challenge'
          }
        }
      });

      try {
        await lemonApi.searchGame("thrust");
        throw new Error('Expected searchGame to throw');
      } catch (error) {
        expect(error.code).to.equal('LEMON64_CLOUDFLARE_CHALLENGE');
        expect(error.message).to.contain('--browser-session');
      }
    });

    it("searchGame should parse manual HTML without an HTTP request", async () => {
      const tempPath = path.join(os.tmpdir(), 'qlemon-manual-search-test.html');
      fs.writeFileSync(tempPath, '<html><body>manual fixture</body></html>');
      const axiosStub = sandbox.stub(axios, 'get');

      await lemonApi.searchGame("thrust", 'c64', { manualHtml: [tempPath], manualHtmlIndex: 0 });

      expect(axiosStub).not.to.have.been.called;
      expect(scraper64.getGames).to.have.been.calledWith('<html><body>manual fixture</body></html>');
      fs.unlinkSync(tempPath);
    });

    xit("getGameByGameId should call the correct api endpoint", () => {
      let axiosStub = sandbox.stub(axios, 'get').resolves(game);
      lemonApi.getGameByGameId(game.gameId);
      expect(axiosStub.calledWith(`https://www.lemon64.com/games/details.php?ID=1234`)).to.equal(true)
    });

    xit("getGameByGameId should call getGameInfoFromGamePage from the scraper64", () => {
      sandbox.stub(axios, 'get').resolves(game);
      lemonApi.getGameByGameId(game);
      expect(scraper64.getGameInfoFromGamePage.calledWith(game));
    });

    xit("searchGame should ", () => {
        let mockPath = path.join(__dirname, 'test/__mocks__/search-page-result5.html');
        const data = fs.readFileSync(mockPath, 'utf8');


    });





});
