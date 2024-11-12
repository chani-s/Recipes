"use client"

import { ObjectId } from "mongodb";


export interface RecipeToAdd{
    _id:ObjectId
    title: string;
    category: string;
    instructions: string[];
    ingredients: string[];
    image: string;
}

