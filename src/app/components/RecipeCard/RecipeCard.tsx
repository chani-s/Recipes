import React, { useState } from 'react';
import styles from './RecipeCard.module.css'; 
import { Recipe } from "@/models/recipe";

import PageSidebar from "../PageSidebar/PageSidebar";

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
              <h2 className={styles.recipeTitle}>{recipe.title}</h2>
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className={styles.recipeImage}
                />
              )}
            </div>
          {selectedRecipe && (
                <div className={styles.sidebar}>
                    <PageSidebar recipe={selectedRecipe} onClose={closeSidebar} />
                </div>
            )}
        </div>
    )};

    export default RecipeCard;

