import React from 'react';
import styles from './show.module.css';
import { Recipe } from "@/models/recipe";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { ObjectId } from 'mongodb';

interface PageSidebarProps {
    recipe: Recipe | null;
    onClose: () => void;
    isFavorite: boolean;
    favoriteFunc: (recipeId: ObjectId) => void;
}
const PageSidebar = ({ recipe, onClose, isFavorite, favoriteFunc }: PageSidebarProps) => {
    if (!recipe) return null;
    return (
        <div className={`${styles.sidebar} ${recipe ? styles.sidebarOpen : ''}`}>
            <div className={styles.topBar}>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
                <button className={styles.heartButton}
                    onClick={() => favoriteFunc(recipe._id)}>
                    {!isFavorite ? <IoHeartOutline className={styles.heartIcon} /> :
                        <IoHeart className={`${styles.heartIcon} ${styles.favoriteIcon}`}
                        />}</button>
            </div>
            <h2 className={styles.title}>{recipe.title}</h2>
            {recipe.image && <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />}
            <h3 className={styles.sectionTitle}>Ingredients:</h3>
            <ul className={styles.ingredientList}>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3 className={styles.sectionTitle}>Instructions:</h3>
            <ol className={styles.instructionList}>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};
export default PageSidebar;