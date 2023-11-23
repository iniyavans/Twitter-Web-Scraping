const { expect } = require('@wdio/globals')
const ActionPage = require('../pageobjects/action.page');
const storeScrapData = require('../../src/controller/user-controller');
const dotenv = require('dotenv');
const env = dotenv.config().parsed

describe('Scrape the details', () => {
    it('Scrape the details', async () => {

        let userName = env.X_USERNAME

        let password = env.X_PASSWORD

        await ActionPage.userLogin(userName, password);

        let keyword = env.X_KEYWORD

        const value = await ActionPage.scrapeSearchResult(keyword);

        console.log(value);

        storeScrapData(value, env)

    })
});

module.exports = { env }; 
