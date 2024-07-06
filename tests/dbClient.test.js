const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const dbClient = require('../utils/db');

describe('Database Client Tests', () => {
  let connection;
  let db;

  before(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__); // Replace with your DB name
  });

  after(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  it('should insert and retrieve a document from the database', async () => {
    const collection = db.collection('users');
    const mockUser = { username: 'testuser', email: 'test@example.com' };

    await collection.insertOne(mockUser);
    const insertedUser = await collection.findOne({ username: 'testuser' });

    expect(insertedUser.username).to.equal(mockUser.username);
    expect(insertedUser.email).to.equal(mockUser.email);
  });

});
