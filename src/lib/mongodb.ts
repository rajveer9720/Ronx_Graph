// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'Ronx';  // Default to 'your_default_database_name'
const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME || 'users';        // Default to 'items'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/** Global is used here to maintain a cached connection across hot reloads in development. */
declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}/${DB_NAME}`).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export { connectToDatabase, DB_NAME, COLLECTION_NAME };
