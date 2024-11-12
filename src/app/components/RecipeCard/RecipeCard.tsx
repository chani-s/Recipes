import React, { useState } from 'react';
import styles from './RecipeCard.module.css';
import { Recipe } from "@/models/recipe";
import { Favorite } from "@/models/favorite";
import { saveToStorage, getFromStorage } from '../../services/localStorage'
import { ObjectId } from "mongodb";
import PageSidebar from "../PageSidebar/PageSidebar";

interface CardProps {
  recipe: Recipe | null;
  index: number;
}

const RecipeCard = ({ recipe, index }: CardProps) => {
  console.log(recipe);


  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);


  const openSidebar = (recipe: Recipe) => {

    console.log("in click");
    setSelectedRecipe(recipe);
  };

  const closeSidebar = () => {
    setSelectedRecipe(undefined);
  };

  const addOrRemoveFromFavorite = (recipeId: ObjectId) => {

    const favoriteRecipes = getFromStorage<Favorite>("favorite") || [];
    const updatedFavoriteRecipes = favoriteRecipes.map(recipe => {
      if (recipe._id == recipeId) {
        const isFavorite = !(recipe.isFavorite)
        return { ...recipe, isFavorite: isFavorite };
      }
      return recipe;
    });
    saveToStorage("favorite", updatedFavoriteRecipes);
  }


  if (!recipe) return null;

  return (
    <div >
      <div
        key={index}
        className={styles.recipeContainer}

      >
        <button onClick={() => openSidebar(recipe)}>open</button>
        <button onClick={() => addOrRemoveFromFavorite(recipe._id)}>⭐</button>

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
  )
};

export default RecipeCard;

