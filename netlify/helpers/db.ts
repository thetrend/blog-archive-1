import { MongoClient, ServerApiVersion, ConnectOptions } from 'mongodb';

const DB = process.env.MONGODB_DATABASE;

const createClient = (): MongoClient => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL } = process.env;
  const URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority`;
  const client = new MongoClient(URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    } as ConnectOptions
  );
  return client;
}

export { DB, createClient };