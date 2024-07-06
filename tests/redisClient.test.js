const { expect } = require('chai');
const sinon = require('sinon');
const redisClient = require('../utils/redis');

describe('Redis Client Tests', () => {
  beforeEach(() => {
    redisClient.flushdb();
  });

  it('should set and get data from Redis', async () => {
    const key = 'testKey';
    const value = 'testValue';

    await redisClient.set(key, value);

    const result = await redisClient.get(key);
    expect(result).to.equal(value);
  });
});
