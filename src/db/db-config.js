// db-config.js
const mongoose = require('mongoose');

function connectToMongoDB(env) {
    mongoose.connect(`mongodb://${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully!');
        return;
    });

    mongoose.connection.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
        return;
    });

}
module.exports = connectToMongoDB;
