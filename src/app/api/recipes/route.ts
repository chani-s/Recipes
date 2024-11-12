
import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments, insertDocument } from "../../services/mongo";

export async function GET() {
  try {
    const client = await connectDatabase();
    const recipes = await getAllDocuments(client, 'Recipe');
    await client.close();
    console.log(recipes)
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.error();
  }
}
export async function POST(req: Request) {
  try {
    const client = await connectDatabase();
    const newRecipe = await req.json();
    const result = await insertDocument(client, 'Recipe', newRecipe);
    await client.close();
    // Return the newly added recipe as a response
    return NextResponse.json(result, { status: 201 }); // 201 Created status
  } catch (error) {
    console.error("Error adding recipe:", error);
    return NextResponse.error();
  }
}
