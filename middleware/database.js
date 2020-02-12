import url from 'url';
import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

if (process.env.NODE_ENV != 'production') require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('MCT');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
