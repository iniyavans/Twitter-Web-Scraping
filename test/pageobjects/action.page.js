const { $ } = require('@wdio/globals')

class actionPage {

    get inputUsername() {
        return $(`//input[@autocomplete = 'username']`); // User name input field from the Sign-In modal.
    }

    get nextButton() {
        return $(`//span[text()= 'Next']`);  // Next button from the Sign in to X modal.
    }

    get inputpassword() {
        return $(`//input[@autocomplete = 'current-password']`); // User name input field from the Sign-In modal.
    }

    get loginButton() {
        return $(`//span[text()= 'Log in']`);  // Login button from the Enter your password to X modal.
    }

    get HomeIcon() {
        return $(`//a[@aria-label = 'Home']`);  // Home icon button from feed page.
    }

    get peopleUsername() {
        return $(`//section//span[contains(text(), '@')]`); // Follower details.
    }

    get userFulName() {
        return $(`//div[@data-testid='UserName']//span//span`);
    }

    get userName() {
        return $(`//div[@data-testid="UserName"]//span[contains(text(), '@')]`);
    }

    get userDescription() {
        return $(`//div[@data-testid="UserDescription"]//span`)
    }

    get followingCount() {
        return $(`//div//a//span//span`);
    }

    get followersCount() {
        return $(`(//div//a//span//span)[3]`);
    }

    get following() {
        return $(`//span[text() = 'Following']`);
    }

    get followers() {
        return $(`//span[text() = 'Followers']`);
    }

    get enableFollow() {
        return $(`//section//span[contains(text(), 'Follow')]`);
    }

    async convertToNumber(value) {

        value = value.replace(/,/g, '');

        if (value.includes('k')) {

            return parseFloat(value.replace('k', '')) * 1000;

        } else if (value.includes('M')) {
            return parseFloat(value.replace('M', '')) * 1000000;
        } else {

            return parseFloat(value);
        }
    }

    async userLogin(userName, password) {
        try {

            await browser.url('https://twitter.com/i/flow/login');

            await browser.maximizeWindow()

            await this.inputUsername.setValue(userName);

            await this.nextButton.click()

            await this.inputpassword.setValue(password);

            await this.loginButton.click();

            await this.HomeIcon.click();

        } catch (error) {

            console.log('An error occurred:', error.message);

        }
    }

    async scrapeSearchResult(Keyword) {

        try {

            let userDetail;

            let userDetails = [];

            let followingUserName = [];

            await browser.url(`https://twitter.com/search?q=${Keyword}&src=typed_query&f=user`);

            await this.enableFollow.waitForClickable(10000);

            const peopleUsernames = await $$(`//section//span[contains(text(), '@')]`);

            for (const element of peopleUsernames) {

                const elementText = await element.getText();

                await browser.newWindow(`https://twitter.com/${elementText}`);

                let Fullname = await (this.userFulName).getText();

                let userName = await (this.userName).getText();

                let userDescriptionXpath = await this.userDescription;

                const isElementDisplayed = await userDescriptionXpath.isDisplayed();

                let userDescription = null;

                if (isElementDisplayed) {

                    userDescription = await userDescriptionXpath.getText();

                }

                let userfollowersCountValue = await (this.followersCount).getText();

                let userfollowersCount = await this.convertToNumber(userfollowersCountValue);

                let userfollowingCountValue = await (this.followingCount).getText();

                let userfollowingCount = await this.convertToNumber(userfollowingCountValue);

                await this.following.click();

                await this.enableFollow.waitForClickable(10000);

                const peopleFollowingnames = await $$(`//section//span[contains(text(), '@')]`);

                for (const element of peopleFollowingnames) {

                    let followingUsers = await element.getText();

                    followingUserName.push(followingUsers);

                }

                await browser.closeWindow();

                await browser.switchWindow(`https://twitter.com/search?q=${Keyword}&src=typed_query&f=user`);

                userDetail = [Fullname, userName, userDescription, userfollowersCount, userfollowingCount, followingUserName];

                userDetails.push(userDetail);
            }

            return userDetails;

        } catch (error) {

            console.log('An error occurred:', error.message);

        }

    }

}

module.exports = new actionPage();
