"use client"
import {getFromStorage} from '../../services/localStorage'
import { Recipe } from "../../../models/recipe";
import { Favorite } from "@/models/favorite";
import { useEffect, useState } from "react";
import styles from '../recipes.module.css';
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const getRecipes = async () => {
        try {
            const favoriteRecipes=getFromStorage<Favorite>("favorite");
            const recipes = getFromStorage<Recipe>("recipes");
            if(favoriteRecipes&&recipes){
                const favoriteRecipesFilter=favoriteRecipes.filter(recipe => recipe.isFavorite==true);
                const filteredArray = recipes.filter(obj2 => 
                    favoriteRecipesFilter.some(obj1 => obj1._id === obj2._id));
                setRecipes(filteredArray);
            }
            else{
                setRecipes([]);
            }
            
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



