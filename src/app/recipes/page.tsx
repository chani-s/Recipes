"use client";
import { useEffect, useState } from "react";
import recipeService from "../services/recipes";
import { Recipe } from "../../models/recipe";
import styles from "./recipes.module.css";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import CategoryPicker from "../components/CategoryPicker/CategoryPicker";

import AddRecipeForm from "../components/addRecipe/addRecipe"; // Import AddRecipeForm

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);  // For filtered recipes
  const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("");  // Track selected category

    const categories = ["מנות ראשונות", "מנות עיקריות", "קינוחים", "עוגיות", "תוספות"];  // Example categories


  const [isFormOpen, setIsFormOpen] = useState(false); // State to control form visibility

  const getRecipes = async () => {
    try {
      const recipesData = await recipeService.getAllRecipes();
      setRecipes(recipesData);
            setFilteredRecipes(recipesData);  // Initially show all recipes
      console.log("Fetched recipes:", recipesData);
    } catch (error: any) {
      console.log("Error fetching recipes:", error.message);
    } finally {
      setLoading(false);
    }
  };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        if (category === "") {
            setFilteredRecipes(recipes);  // Show all recipes if no category is selected
        } else {
            const filtered = recipes.filter(recipe => recipe.catergory === category);
            setFilteredRecipes(filtered);  // Filter recipes based on selected category
        }
    };


  useEffect(() => {
    getRecipes();
  }, []);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleAddRecipe = async (newRecipe: Recipe) => {
    const nesDoc= await recipeService.addRecipe(newRecipe);
    const recipesData = await recipeService.getAllRecipes();
    console.log("New Recipe added:", nesDoc);
    console.log(recipesData)
    setRecipes(recipesData);
    handleCloseForm(); // Close the form after adding
  };

  return (
    <div className={styles.pageContainer}>
      {/* Category Picker */}
      <CategoryPicker categories={categories} onCategorySelect={handleCategorySelect} />

      {/* Button to open the Add Recipe form */}
      <button onClick={handleOpenForm} className={styles.addButton}>
        Add Recipe
      </button>

      {/* AddRecipeForm displayed as a sidebar */}
      {isFormOpen && (
        <AddRecipeForm
          onAddRecipe={handleAddRecipe}
          onClose={handleCloseForm}
        />
      )}

      {/* Loading or recipe grid */}
      {loading ? (
        <p>LOADING...</p>
      ) : (
        <div className={styles.recipesGrid}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} index={index} key={index} />
            ))
          ) : (
            <p>No recipes found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
