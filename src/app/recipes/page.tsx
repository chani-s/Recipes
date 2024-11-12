"use client"
import recipeService from "../services/recipes";
import { Recipe } from "../../models/recipe";
import { useEffect, useState } from "react";
import styles from './recipes.module.css';
import RecipeCard from "../components/RecipeCard/RecipeCard";
import CategoryPicker from "../components/CategoryPicker/CategoryPicker";


const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);  // For filtered recipes
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("");  // Track selected category

    const categories = ["מנות ראשונות", "מנות עיקריות", "קינוחים", "עוגיות", "תוספות"];  // Example categories


    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            setRecipes(recipesData);
            setFilteredRecipes(recipesData);  // Initially show all recipes
            console.log("Fetched recipes:", recipesData);
        } catch (error: any) {
            console.log("Error fetching recipes:", error.message);
        }
        finally {
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


    return (
        <div>
            <CategoryPicker categories={categories} onCategorySelect={handleCategorySelect} />

            <div className={styles.pageContainer}>
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
                    // <div className={styles.recipesGrid}>
                    //     {recipes.map((recipe, index) => (
                    //         <RecipeCard recipe={recipe} index={index} />
                    //     ))}
                    // </div>

                )}

            </div>
        </div>

    );
};
export default Page;



