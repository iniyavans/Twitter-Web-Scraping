const connectToMongoDB = require("../db/db-config");
const ScrapedData = require("../model/Scrap-data-model");

async function storeScrapData(values, env) {
    try {
        // Establish MongoDB connection
        await connectToMongoDB(env);

        // Process and store scraped data
        const dataToStore = values.map(value => ({
            tag_name: value[0],
            full_name: value[1],
            user_name: value[2],
            description: value[3],
            followers_cont: value[4],
            following_count: value[5],
            location: value[6],
            professional_category: value[7],
            joined_date: value[8],
            website: value[9],
            following_users: value[10]
        }));

        // Create documents in the database
        await ScrapedData.insertMany(dataToStore);

        console.log('Scraped data stored successfully.');

    } catch (err) {

        console.error('Error storing scraped data:', err);

    }
}

module.exports = storeScrapData;
