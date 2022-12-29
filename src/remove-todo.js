const { MongoClient, ObjectId } = require('mongodb');
const { configs } = require('../confgs');
const removeTodo = async (event) => {
  const client = new MongoClient(configs.MONGO_URL);
  const { id } = event.pathParameters;

  const todo = await client.db().collection('todos').findOne({_id: new ObjectId(id)});

  if(!todo) return {
    statusCode: 404,
    body: 'Not found',
  }

  await client.db().collection('todos').deleteOne({_id: new ObjectId(id)});

  return {
    statusCode: 204,
  };
};

module.exports = {
  handler: removeTodo,
};

