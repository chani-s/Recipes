"use client"
import recipeService from "../services/recipes";
import { saveToStorage, getFromStorage } from '../services/localStorage'
import { Recipe } from "../../models/recipe";
import { Favorite } from "../../models/favorite";
import { useEffect, useState } from "react";
import styles from './recipes.module.css';
import RecipeCard from "../components/RecipeCard/RecipeCard";

const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            saveToStorage("recipes", recipesData);
            const favoriteRecipes = getFromStorage<Favorite>("favorite");
            if (!favoriteRecipes) {
                const favoriteRecipsArr = recipesData.map(obj => ({
                    _id: obj._id,
                    isFavorite: false
                }));
                saveToStorage("favorite", favoriteRecipsArr);
            }
            setRecipes(recipesData);
            console.log("Fetched recipes:", recipesData);
        } catch (error: any) {
            console.log("Error fetching recipes:", error.message);
        }
        finally {
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



