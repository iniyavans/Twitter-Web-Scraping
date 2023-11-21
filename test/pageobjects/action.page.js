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
        return $(`//div[@data-testid="UserDescription"]`)
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

    get userLocation() {
        return $(`//span[@data-testid='UserLocation']//span//span`)
    }

    get userProfessional() {
        return $(`//span[@data-testid='UserProfessionalCategory']//span//span`);
    }

    get userJoined() {
        return $(`//span[@data-testid='UserJoinDate']//span`)
    }

    get userWebsite() {
        return $(`//a[@data-testid='UserUrl']//span`)
    }

    async partialElement(xpath) {

        let elementXpath = await xpath;  // Declare the element xpath into the variable.

        const isElementDisplayed = await elementXpath.isDisplayed();    // Verify the element is displayed to the windows.

        let elementValue = null; // Initialize the value as a Null.

        if (isElementDisplayed) {   // check if the element is displayed or not.

            elementValue = await elementXpath.getText(); // If true, Get the values.

        }

        return elementValue;    // Return the element value.
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

            let userDetail; // Initialize the empty variable.

            let userDetails = [];   // Initialize the empty variable.

            let followingUserName = []; // Initialize the empty variable.

            await this.HomeIcon.click();    // Initialize the empty variable.

            await browser.url(`https://twitter.com/search?q=${Keyword}&src=typed_query&f=user`);    // Redirected to the search page with a keyword.

            await this.enableFollow.waitForClickable(10000);    // Wait until the user details come.

            const peopleUsernames = await $$(`//section//span[contains(text(), '@')]`); // Initialize the user name elements into the variable.

            for (const element of peopleUsernames) {    // Scrape the user name from the search result page.

                const elementText = await element.getText();    // Get the user names.

                await browser.newWindow(`https://twitter.com/${elementText}`);  // Open the new window with a user name.

                let Fullname = await (this.userFulName).getText();  // Get the user full name.

                let userName = await (this.userName).getText(); // Get the user name.

                let userDescription = await this.partialElement(this.userDescription);  // Get the user Description value.

                let userfollowersCount = await (this.followersCount).getText(); // Get the user followers count.

                let userfollowingCount = await (this.followingCount).getText(); // Get the user following count.

                let userLocation = await this.partialElement(this.userLocation);  // Get the user location value.

                let userProfessional = await this.partialElement(this.userProfessional);  // Get the user Professional value.

                let userJoineddate = await this.partialElement(this.userJoined);  // Get the user joined date value.

                let userWebsite = await this.partialElement(this.userWebsite);  // Get the user joined date value.

                await browser.url(`https://twitter.com/${elementText}/following`);  // Redirected to the user following details page.

                await this.enableFollow.waitForClickable(10000);    // Wait until the follow button enebale.

                const peopleFollowingnames = await $$(`//div//div//a[contains(@href, '/')]//div//div//span[contains(text(), '@')]`);    // Initalize the following user name with a variable. 

                for (const element of peopleFollowingnames) {   // Scrape the user name from the following page.

                    let followingUsers = await element.getText();   // Get the user following user name.

                    followingUserName.push(followingUsers); // Add the values into the FollowingUserName array.

                }

                await browser.closeWindow();    // Close the active window.

                await browser.switchWindow(`https://twitter.com/search?q=${Keyword}&src=typed_query&f=user`);   // Switch the window back to the home.

                userDetail = [Keyword, Fullname, userName, userDescription, userfollowersCount, userfollowingCount, userLocation, userProfessional, userJoineddate, userWebsite, followingUserName]; // Organize all the values into the array.

                userDetails.push(userDetail);   // Add the evenry details into the array.
            }

            return userDetails; // Return the value.

        } catch (error) {

            console.log('An error occurred:', error.message);

        }

    }

}

module.exports = new actionPage();
