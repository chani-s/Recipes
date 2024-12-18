"use client"
import { getFromStorage } from '../../services/localStorage'
import { Recipe } from "../../../models/recipe";
import { useEffect, useState } from "react";
import styles from '../recipes.module.css';
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useObjectIdStore } from '../../services/zustand';
import { FaArrowRight} from 'react-icons/fa';
import Link from 'next/link';


const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const objectIds = useObjectIdStore((state) => state.objectIds);
    const setObjectIds = useObjectIdStore((state) => state.setObjectIds);


    const getRecipes = async () => {
        try {
            console.log("start");

            const favoriteRecipes = getFromStorage("favorite");
            const recipes = getFromStorage<Recipe>("recipes");
            if (favoriteRecipes && recipes) {
                const filteredRecipes = recipes.filter(recipe => favoriteRecipes.includes(recipe._id));
                setRecipes(filteredRecipes);
                console.log(filteredRecipes);

            }
            else {
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
        console.log("kkjhhgfxfghk");

        getRecipes();
    }, [objectIds]);



    return (
        <div>
            <div className={styles.pageContainer}>
                {loading ? (
                    <p>LOADING...</p>
                ) : (
                    <div>
                        <Link className="nav-link" href="/recipes"><FaArrowRight className={styles.backIcon} /></Link>
                        <div className={styles.recipesGrid}>
                            {recipes.map((recipe, index) => (
                                <RecipeCard recipe={recipe} index={index} />
                            ))}
                        </div>
                    </div>

                )}

            </div>
        </div>

    );
};
export default Page;



