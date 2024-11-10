import { NextResponse } from "next/server";
import { getAllDocuments, connectDatabase, insertDocument } from "../../services/mongo";

export async function GET(request : Request){
    const client = await connectDatabase();
    const cars = await getAllDocuments(client, 'Recipe');
    await client.close();
    console.log(cars);
    return NextResponse.json(cars);
}
