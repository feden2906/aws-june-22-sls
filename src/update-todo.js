const { MongoClient, ObjectId } = require('mongodb');
const { configs } = require('../confgs');
const updateTodo = async (event) => {
  const client = new MongoClient(configs.MONGO_URL);
  const { completed } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const todo = await client.db().collection('todos').findOne({_id: new ObjectId(id)});

  if(!todo) return {
    statusCode: 404,
    body: 'Not found',
  }

  await client.db().collection('todos').updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          updatedAt: new Date().toISOString(),
          completed,
        }
      }
  );

  return {
    statusCode: 201,
    body: 'Updated',
  };
};

module.exports = {
  handler: updateTodo,
};

