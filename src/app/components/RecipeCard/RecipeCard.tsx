import React, { useEffect, useState } from 'react';
import styles from './RecipeCard.module.css';
import { Recipe } from "@/models/recipe";
import { saveToStorage, getFromStorage } from '../../services/localStorage'
import { ObjectId } from "mongodb";
import PageSidebar from "../PageSidebar/PageSidebar";
import { useObjectIdStore } from '../../services/zustand';
import { FaRegStar, FaStar } from "react-icons/fa";


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

    console.log("in click");
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
        className={styles.recipeContainer}

      >
        <button onClick={() => openSidebar(recipe)}>open</button>
        <button onClick={() => addOrRemoveFromFavorite(recipe._id)}>{!isFavorite ? <FaRegStar /> : <FaStar />}</button>

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

