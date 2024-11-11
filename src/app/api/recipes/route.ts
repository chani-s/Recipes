

import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments } from "../../services/mongo";

export async function GET() {
  try {
    const client = await connectDatabase();
    const recipes = await getAllDocuments(client, 'Recipe');
    console.log(recipes)
    await client.close();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.error();
  }
}

