const { expect } = require('@wdio/globals')
const ActionPage = require('../pageobjects/action.page');
const storeScrapData = require('../../src/controller/user-controller');
const dotenv = require('dotenv');
const env = dotenv.config().parsed

describe('Scrape the details', () => {
    it('Scrape the details', async () => {

        let userName = env.TWITTER_USERNAME

        let password = env.TWITTER_PASSWORD

        await ActionPage.userLogin(userName, password);

        let keyword = 'Crypto'

        value = await ActionPage.scrapeSearchResult(keyword);

        storeScrapData(value ,env)

    })
});

module.exports = { env }; 
