const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `mongodb://${host}:${port}`;

        this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = database;

        this.client.connect()
            .then(() => {
                this.db = this.client.db(this.dbName);
                console.log('Connected successfully to MongoDB');
            })
            .catch((err) => {
                console.error('MongoDB connection error:', err);
            });
    }

    async isAlive() {
        try {
            await this.client.db(this.dbName).command({ ping: 1 });
            return true;
        } catch (error) {
            return false;
        }
    }

    async nbUsers() {
        try {
            return await this.db.collection('users').countDocuments();
        } catch (error) {
            console.error('Error counting users in MongoDB:', error);
            return 0;
        }
    }

    async nbFiles() {
        try {
            return await this.db.collection('files').countDocuments();
        } catch (error) {
            console.error('Error counting files in MongoDB:', error);
            return 0;
        }
    }
}

const dbClient = new DBClient();
module.exports = dbClient;