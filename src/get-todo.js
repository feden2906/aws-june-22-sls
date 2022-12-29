const { MongoClient, ObjectId } = require('mongodb');
const { configs } = require('../confgs');
const getTodo = async (event) => {
  const client = new MongoClient(configs.MONGO_URL);
  const { id } = event.pathParameters;


  const todo = await client.db().collection('todos').findOne({_id: new ObjectId(id)});

  if(!todo) return {
    statusCode: 404,
    body: 'Not found',
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: getTodo,
};

