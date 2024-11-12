// Page.tsx
"use client";
import { useEffect, useState } from "react";
import recipeService from "../services/recipes";
import { Recipe } from "../../models/recipe";
import styles from "./recipes.module.css";
import RecipeCard from "../components/RecipeCard/RecipeCard";

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const getRecipes = async () => {
    try {
      const recipesData = await recipeService.getAllRecipes();
      setRecipes(recipesData);
      console.log("Fetched recipes:", recipesData);
    } catch (error: any) {
      console.log("Error fetching recipes:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <div className={styles.pageContainer}>
        {loading ? (
          <p>LOADING...</p>
        ) : (
          <div className={styles.recipesGrid}>
            {recipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
