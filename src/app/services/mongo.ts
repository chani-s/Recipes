"use server";

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
  }
  clientPromise = client.connect();
  return clientPromise;
}

export async function getAllDocuments(client: any, collection: string) {
  const db = client.db("Recipes");
  const documents = await db.collection(collection).find().toArray();
  return documents;
}
export async function insertDocument(client: MongoClient, collection: string, document: object) {
  const db = client.db("Recipes");
  const result = await db.collection(collection).insertOne(document);
  console.log("the result"+result.toString());
  const insertedDocument = await db.collection(collection).findOne({ _id: result.insertedId });
  return insertedDocument;
}