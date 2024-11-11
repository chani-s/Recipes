<<<<<<< HEAD
// page.tsx
"use client"
import recipeService from "../services/recipes";
import { Recipe } from "../models/recipe"
import { useState } from "react";

function Page() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

=======
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

>>>>>>> b38c5ae (f)
    const getRecipe = async () => {
        try {
            const recipe = await recipeService.getAllRecipes()
            setRecipes(recipe);
            console.log("Fetched recipes:", recipes);

        } catch (error: any) {
            console.log("Error adding recipe:", error.message);
        }
    };
<<<<<<< HEAD

    return (
        <div>
            <h1>My Recipes</h1>
            <button onClick={getRecipe}>Get Recipes</button>
            {recipes.map(recipe => (
                <div key={recipe.id.toString()}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.ingredients}</p>
                </div>
            ))}
        </div>
    );
}

=======
    return(

        <div>gfgrf</div>
    )

 
}
>>>>>>> b38c5ae (f)
export default Page;