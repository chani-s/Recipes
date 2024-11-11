"use server"; // This directive indicates the file runs on the server-side

import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export async function connectDatabase() {
  if (!client) {
    const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
    if (!dbConnectionString) {
      throw new Error("Database connection string is not defined");
    }
    client = new MongoClient(dbConnectionString);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getAllDocuments(client: any, collection: string) {
  const db = client.db("Recipe");
  const documents = await db.collection(collection).find().toArray();
  return documents;
}
