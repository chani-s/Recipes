// Page.tsx
"use client";
import { useEffect, useState } from "react";
import recipeService from "../services/recipes";
import { Recipe } from "../../models/recipe";
import styles from './recipes.module.css';
import PageSidebar from "../PageSidebar/PageSidebar";
import AddRecipeForm from "../addRecipe/addRecipe";

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

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

  const openSidebar = (recipe: Recipe) => setSelectedRecipe(recipe);
  const closeSidebar = () => setSelectedRecipe(undefined);

  const handleAddRecipe = (newRecipe: Recipe) => {
    setRecipes([...recipes, newRecipe]);
    setIsAddFormOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <button onClick={() => setIsAddFormOpen(true)} className={styles.addRecipeButton}>Add Recipe</button>

      {loading ? (
        <p className={styles.loading}>LOADING...</p>
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

      {isAddFormOpen && (
        <div className={styles.addFormSidebar}>
          <AddRecipeForm onAddRecipe={handleAddRecipe} onClose={() => setIsAddFormOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Page;
