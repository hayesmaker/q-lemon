const assert = require('assert');
const lemonApi = require('../lib/lemon-api');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const axios = require('axios');
const scraper = require('../lib/lemon-scraper');


describe('q-lemon :: lemon api', function () {
  describe('searchGame', function () {
    let sandbox;


    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Passed cb should have been called', function (done) {
      let cb = sinon.stub();
      sinon.stub(scraper, "getGameIdFromSearchPage").returns({
        gameId: "1234"
      });
      sandbox.stub(axios, 'get').resolves({
        game: "gamePage"
      });
      lemonApi.searchGame("Thrust", cb).then(() => {
        expect(cb.called).to.equal(true);
        done();
      });

      //assert.equal([1, 2 , 3].indexOf(4), -1);
    });
  });
});