"use client"
import recipeService from "../services/recipes";
import { saveToStorage, getFromStorage } from '../services/localStorage'
import { Recipe } from "../../models/recipe";
import { useEffect, useState } from "react";
import styles from './recipes.module.css';
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { useObjectIdStore } from '../services/zustand';
import { ObjectId } from "mongodb";


const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const setObjectIds = useObjectIdStore((state) => state.setObjectIds);

    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            saveToStorage("recipes", recipesData);
            setRecipes(recipesData);

            const favoriteRecipes = getFromStorage<ObjectId>("favorite");
            
            if (favoriteRecipes)
                setObjectIds(favoriteRecipes);
            else
                setObjectIds([]);

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



