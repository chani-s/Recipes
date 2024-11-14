// Origin RecipeCard - before ruty's code

import React, { useState } from 'react';
import styles from './RecipeCard.module.css'; 
import { Recipe } from "@/models/recipe";
import PageSidebar from "../PageSidebar/PageSidebar";
import { saveToStorage, getFromStorage } from '../../services/localStorage'
import { ObjectId } from "mongodb";
import { useObjectIdStore } from '../../services/zustand';
import { FaRegStar, FaStar } from "react-icons/fa";

interface CardProps {
    recipe: Recipe | null;
    index: number;
}

const RecipeCard = ({recipe, index}: CardProps) => {
    
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);


    const openSidebar = (recipe: Recipe) => {
        console.log("in click");
        setSelectedRecipe(recipe);
    };

    const closeSidebar = () => {
        setSelectedRecipe(undefined);
    };

    if (!recipe) return null;

    return (
        <div >
            <div
              key={index}
              className={styles.recipeContainer}
              onClick={() => openSidebar(recipe)}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className={styles.recipeImage}
                />
              )}
                            <h2 className={styles.recipeTitle}>{recipe.title}</h2>

            </div>
          {selectedRecipe && (
                <div className={styles.sidebar}>
                    <PageSidebar recipe={selectedRecipe} onClose={closeSidebar} />
                </div>
            )}
        </div>
    )};

    export default RecipeCard;

