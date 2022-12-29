const { MongoClient } = require('mongodb');
const { configs } = require('../confgs');
const getTodos = async () => {
  const client = new MongoClient(configs.MONGO_URL);

  const todos = await client.db().collection('todos').find().toArray();

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: getTodos,
};

