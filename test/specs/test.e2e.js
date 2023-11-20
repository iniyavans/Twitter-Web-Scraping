const { expect } = require('@wdio/globals')
const ActionPage = require('../pageobjects/action.page')

describe('Scrape the details', () => {
    it('Scrape the details', async () => {

        var userName = 'iniyavan_choco_'

        var password = 'Iniyavan420@'

        await ActionPage.userLogin(userName, password);

        var keyword = 'NFTs'

        await ActionPage.scrapeSearchResult(keyword);
    })
});

