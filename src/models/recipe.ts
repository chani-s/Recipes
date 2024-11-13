// recipe.ts
"use client"

import { ObjectId } from "mongodb";

export interface Recipe{
    _id: ObjectId;
    title: string;
<<<<<<< HEAD:src/app/models/recipe.ts
    category: string;
=======
    catergory: string;
>>>>>>> d5c1b8823ee113a28075c99f068300d0c7f101f2:src/models/recipe.ts
    instructions: string[];
    ingredients: string[];
    image: string;
}


