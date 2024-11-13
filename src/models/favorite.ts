// recipe.ts
"use client"

import { ObjectId } from "mongodb";

export interface Favorite{
    _id: ObjectId;
    isFavorite: boolean;
    
}


