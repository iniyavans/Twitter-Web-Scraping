
# Twitter(x) Web Scraping

## Overview
This project is a Node.js and WebdriverIO-based tool designed for scraping details from Twitter. It leverages the Twitter API to extract information, specifically focusing on web3-related details from Twitter. This includes project contract details and current follower information. The scraping process is initiated by using trending project keywords.

## How it Works
The scraper searches for trending keywords used as tags, extracting user details based on the specified keyword. For instance, if you provide the keyword "NFT marketplace," the scraper retrieves details similar to OpenSea's, including current followers and additional information about them.

## Features

**User Profile details:** Gather comprehensive information about Twitter users, including bios, follower counts, and more.

**Customizable:** Easily adapt the script to meet your specific requirements by modifying parameters and filters.

**Data Storage:** Save scraped data locally or in a database for further analysis.

## How to Run

  Clone the repository to your local machine:

      git clone https://github.com/iniyavans/Twitter-Web-Scraping.git

Install the required Node modules:

      npm i

Run the project using WebdriverIO:

      npx wdio run ./wdio.conf.js --spec test.e2e.js


Note: Make sure the MongoDB server is on up.
