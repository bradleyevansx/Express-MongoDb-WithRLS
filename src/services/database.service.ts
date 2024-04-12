import { MongoClient, Db, Collection, Document } from "mongodb";
import dotenv from "dotenv";
import { Entity } from "../../models/contracts/Entity";

let isSetup = false;
let database: Db;

async function connectDatabase(): Promise<void> {
  if (isSetup) return;
  dotenv.config();
  const client = new MongoClient(process.env.DB_CONN_STRING!);
  try {
    await client.connect();
    database = client.db(process.env.DB_NAME);
    console.log(`Successfully connected to database: ${database.databaseName}`);
    isSetup = true;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

export async function getCollection<T extends Entity>(
  collectionName: string
): Promise<Collection<T>> {
  await connectDatabase();
  const collection = database.collection<T>(collectionName);
  return collection;
}
