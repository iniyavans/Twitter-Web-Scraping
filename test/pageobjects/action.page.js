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
        return $(`(//div//a//span//span)[3]`)
    }

    get following() {
        return $(`//span[text() = 'Following']`)
    }

    get followers() {
        return $(`//span[text() = 'Followers']`)
    }


    /*
        get userProfile() {
            return $(`//span[text()= 'Profile']`);   // User profile button from the Nav bar.
        }
    
        get myFollowers() {
            return $(`//span[text()= 'Followers']`);   // Followers button from the profile.
        }
    
        get followerUsername() {
            return $(`//div[@aria-label = 'Timeline: Followers']//span[contains(text(), '@')]`);
        }
    */
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

            await browser.url(`https://twitter.com/search?q=${Keyword}&src=typed_query&f=user`)

            const element = this.peopleUsername;

            const elementText = await element.getText();

            console.log('Element Text:', elementText);

            await browser.newWindow(`https://twitter.com/${elementText}`);

            var Fullname = await (this.userFulName).getText();

            var userName = await (this.userName).getText();

            var userDescription = await (this.userDescription).getText();

            var userfollowersCount = await (this.followersCount).getText();

            var userfollowingCount = await (this.followingCount).getText();

            console.log('User Details:', Fullname, userName, userDescription, userfollowersCount, userfollowingCount);

            await browser.closeWindow();

            await browser.switchWindow(`https://twitter.com/search?q=${Keyword}&src=typed_query&f=user`);

        } catch (error) {
            console.log('An error occurred:', error.message);
        }

    }

}

module.exports = new actionPage();
