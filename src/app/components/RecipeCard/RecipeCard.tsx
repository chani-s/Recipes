import React, { useState } from 'react';
import styles from './RecipeCard.module.css';
import { Recipe } from "@/models/recipe";
import PageSidebar from "../PageSidebar/PageSidebar";
import { saveToStorage, getFromStorage } from '../../services/localStorage'
import { ObjectId } from "mongodb";
import { useObjectIdStore } from '../../services/zustand';
import { IoMdHeart } from 'react-icons/io';
import { IoHeartOutline } from "react-icons/io5";


interface CardProps {
    recipe: Recipe | null;
    index: number;
}

const RecipeCard = ({ recipe, index }: CardProps) => {
    const setObjectIds = useObjectIdStore((state) => state.setObjectIds);
    const objectIds = useObjectIdStore((state) => state.objectIds);
    const isFavorite = objectIds.some((objectId) => objectId.toString() === recipe?._id.toString());

    console.log("klklkl");
    console.log(objectIds);
    console.log(isFavorite);

    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);


    const openSidebar = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeSidebar = () => {
        setSelectedRecipe(undefined);
    };

    const addOrRemoveFromFavorite = (recipeId: ObjectId) => {

        const favoriteRecipes = getFromStorage<ObjectId>("favorite") || [];

        const index = favoriteRecipes.findIndex(obj => obj == recipeId);

        if (index !== -1) {
            favoriteRecipes.splice(index, 1);
        } else {
            favoriteRecipes.push(recipeId);
        }
        saveToStorage("favorite", favoriteRecipes);

        console.log(favoriteRecipes);

        if (favoriteRecipes)
            setObjectIds(favoriteRecipes);
        else
            setObjectIds([]);
    }

    if (!recipe) return null;

    return (
        <div >
            <div
                key={index}
                className={styles.recipeContainer}>
                {recipe.image && (
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className={styles.recipeImage}
                    />
                )}
                <h2 className={styles.recipeTitle}>{recipe.title}</h2>
                <div className={styles.buttonsBar}>
                    <button className={styles.openButton} onClick={() => openSidebar(recipe)}>open</button>
                    <button className={styles.starBbutton}
                        onClick={() => addOrRemoveFromFavorite(recipe._id)}>
                        {!isFavorite ? <IoHeartOutline className={styles.heartIcon} /> :
                            <IoMdHeart className={`${styles.heartIcon} ${styles.favoriteIcon}`}
                            />}</button>
                </div>
            </div>
            {selectedRecipe && (
                <div className={styles.sidebar}>
                    <PageSidebar recipe={selectedRecipe} onClose={closeSidebar} />
                </div>
            )}
        </div>
    )
};

export default RecipeCard;

