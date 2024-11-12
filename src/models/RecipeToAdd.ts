"use client"

import { ObjectId } from "mongodb";


export interface RecipeToAdd{
    title: string;
    category: string;
    instructions: string[];
    ingredients: string[];
    image: string;
}

