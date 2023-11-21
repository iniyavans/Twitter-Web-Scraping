const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
    name: String,
    user_name: String,
    description: String,
    followers_cont: String,
    following_count: String,
    following_users: [String],
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1
    }
}, { versionKey: false });

const ScrapedData = mongoose.model('scraped-data', scrapedDataSchema);

module.exports = ScrapedData;
