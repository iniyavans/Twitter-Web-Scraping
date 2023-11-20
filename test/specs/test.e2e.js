const { expect } = require('@wdio/globals')
const ActionPage = require('../pageobjects/action.page')

describe('Scrape the details', () => {
    it('Scrape the details', async () => {

        let userName = 'iniyavan_choco_'

        let password = 'Iniyavan420@'

        await ActionPage.userLogin(userName, password);

        let keyword = 'NFTs'

        let value = await ActionPage.scrapeSearchResult(keyword);

        console.log(value);
    })
});

