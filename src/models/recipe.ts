// recipe.ts
"use client";

import { ObjectId } from "mongodb";

export interface Recipe{
    _id: ObjectId;
    title: string;
    category: string;
    instructions: string[];
    ingredients: string[];
    image: string;
}
