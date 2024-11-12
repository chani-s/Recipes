"use client"
import recipeService from "../services/recipes";
import { Recipe } from "../../models/recipe";
import { useEffect, useState } from "react";
import styles from './recipes.module.css';
import PageSidebar from "../PageSidebar/PageSidebar";

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true); // New loading state

  const getRecipes = async () => {
    try {
      const recipesData = await recipeService.getAllRecipes();
      setRecipes(recipesData);
      console.log("Fetched recipes:", recipesData);
    } catch (error: any) {
      console.log("Error fetching recipes:", error.message);
    }
    finally {
      setLoading(false); // Set loading to false once data is fetched or an error occurs
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const openSidebar = (recipe: Recipe) => {
    console.log("in click");
    setSelectedRecipe(recipe);
  };

  const closeSidebar = () => {
    setSelectedRecipe(undefined);
  };

  return (
    <div className={styles.pageContainer}>
      {loading ? ( // Check if data is still loading
        <p>LOADING...</p>
      ) : (
        <div className={styles.recipesGrid}>
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className={styles.recipeContainer}
              onClick={() => openSidebar(recipe)}
            >
              <h2 className={styles.recipeTitle}>{recipe.title}</h2>
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className={styles.recipeImage}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div className={styles.sidebar}>
          <PageSidebar recipe={selectedRecipe} onClose={closeSidebar} />
        </div>
      )}
    </div>
  );
};


export default Page;
