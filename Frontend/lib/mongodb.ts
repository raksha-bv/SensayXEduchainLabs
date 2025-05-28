import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI as string;

if (!uri) throw new Error("Please define the MONGODB_URI environment variable");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use global variable in development to prevent multiple connections
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // Create new client in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
