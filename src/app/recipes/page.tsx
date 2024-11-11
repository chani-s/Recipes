"use client"
import recipeService from "../services/recipes";
import { Recipe } from "../models/recipe"
import { useState } from "react";

function Page() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getRecipe = async () => {
        try {
            const recipe = await recipeService.getAllRecipes()
            setRecipes(recipe);
            console.log("Fetched recipes:", recipes);

        } catch (error: any) {
            console.log("Error adding recipe:", error.message);
        }
    };

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

export default Page;