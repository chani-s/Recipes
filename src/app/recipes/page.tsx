"use client"
import recipeService from "../services/recipes";
import {Recipe} from "../models/recipe"
import { useEffect, useState } from "react";

function Page(){
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(()=>{
        console.log("fj")
        getRecipe();
      },[]);

    const getRecipe = async () => {
        try {
            const recipe = await recipeService.getAllRecipes()
            setRecipes(recipe);
            console.log("Fetched recipes:", recipes);

        } catch (error: any) {
            console.log("Error adding recipe:", error.message);
        }
    };
    return(

        <div>gfgrf</div>
    )

 
}
export default Page;