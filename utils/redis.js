const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        this.client.getAsync = promisify(this.client.get).bind(this.client);
        this.client.setAsync = promisify(this.client.set).bind(this.client);
        this.client.delAsync = promisify(this.client.del).bind(this.client);

        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        });
        this.client.on('connect', () => console.log('Redis client connected to the server'));
    }

    async isAlive() {
        return this.client.connected;
    }

    async get(key) {
        try {
            const value = await this.client.getAsync(key);
            return value;
        } catch (error) {
            console.error('Error retrieving value from Redis:', error);
            return null;
        }
    }

    async set(key, value, durationInSeconds) {
        try {
            await this.client.setAsync(key, value, 'EX', durationInSeconds);
            return true;
        } catch (error) {
            console.error('Error setting value in Redis:', error);
            return false;
        }
    }

    async del(key) {
        try {
            await this.client.delAsync(key);
            return true;
        } catch (error) {
            console.error('Error deleting value from Redis:', error);
            return false;
        }
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
