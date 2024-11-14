import React from 'react';
import styles from './show.module.css';
import { Recipe } from "@/models/recipe";
interface PageSidebarProps {
    recipe: Recipe | null;
    onClose: () => void;
}
const PageSidebar = ({ recipe, onClose }: PageSidebarProps) => {
    if (!recipe) return null;
    return (
        <div className={`${styles.sidebar} ${recipe ? styles.sidebarOpen : ''}`}>
            <button onClick={onClose} className={styles.closeButton}>Close</button>
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