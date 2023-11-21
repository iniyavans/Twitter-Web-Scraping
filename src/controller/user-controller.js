const connectToMongoDB = require("../db/db-config");
const ScrapedData = require("../model/Scrap-data-model");

async function storeScrapData(values, env) {
    try {
        // Establish MongoDB connection
        await connectToMongoDB(env);

        // Process and store scraped data
        const dataToStore = values.map(value => ({
            name: value[0],
            user_name: value[1],
            description: value[2],
            followers_cont: value[3],
            following_count: value[4],
            following_users: value[5]
        }));

        // Create documents in the database
        await ScrapedData.insertMany(dataToStore);
        
        console.log('Scraped data stored successfully.');
    } catch (err) {
        console.error('Error storing scraped data:', err);
    }
}

module.exports = storeScrapData;
