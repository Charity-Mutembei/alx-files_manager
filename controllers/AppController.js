const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
    static async getStatus(req, res) {
        const redisAlive = await redisClient.isAlive();
        const dbAlive = await dbClient.isAlive();

        res.status(200).json({ redis: redisAlive, db: dbAlive });
    }

    static async getStats(req, res) {
        const userCount = await dbClient.nbUsers();
        const fileCount = await dbClient.nbFiles();

        res.status(200).json({ users: userCount, files: fileCount });
    }
}

module.exports = AppController;
