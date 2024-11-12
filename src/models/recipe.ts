// recipe.ts
"use client";

import { ObjectId } from "mongodb";

export interface Recipe{
    _id: ObjectId;
    title: string;
    catergory: string;
    instructions: string[];
    ingredients: string[];
    image: string;
}
