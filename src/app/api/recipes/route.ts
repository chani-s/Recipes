<<<<<<< HEAD


=======
// // route.ts
// import { NextResponse } from "next/server";
// import { getAllDocuments, connectDatabase, insertDocument } from "../../services/mongo";

// export async function GET(request : Request){
//     const client = await connectDatabase();
//     const recipes = await getAllDocuments(client, 'Recipe');
//     await client.close();
//     console.log(recipes);
//     return NextResponse.json(recipes);
// }
>>>>>>> ec4a8af (my diffrence)
import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments } from "../../services/mongo";

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

