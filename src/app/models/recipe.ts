"use client"

import { ObjectId } from "mongodb";

export interface Recipe{
    id: ObjectId;
    title: string;
    category: string;
    instructions: string;
    ingredients: string[];
    image: string;
}
