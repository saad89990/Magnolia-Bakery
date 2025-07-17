const { MongoClient } = require("mongodb");

async function ConnectMongoDB(uri) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect(); // Ensures the client is connected
  return client;
}

module.exports = { ConnectMongoDB };
