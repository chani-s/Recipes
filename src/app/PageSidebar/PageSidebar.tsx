// showRecipes/page.tsx
"use client"
import React from 'react';
import styles from './show.module.css'; // Create a CSS module for styling
import { Recipe } from "@/models/recipe";

<<<<<<< HEAD:src/app/PageSidebar/PageSidebar.tsx
interface PageSidebarProps {
    recipe: Recipe | null;
    onClose: () => void;
}

const PageSidebar = ({ recipe, onClose }: PageSidebarProps) => {
=======
type PageSidebarProps = {
    recipe: Recipe | null;
    onClose: () => void;
};

const PageSidebar: React.FC<PageSidebarProps> = ({ recipe, onClose }) => {
>>>>>>> a8ffd89 (try to fix vercel):src/app/showRecipe/page.tsx
    if (!recipe) return null;

    return (
        <div className={`${styles.sidebar} ${recipe ? styles.sidebarOpen : ''}`}>
            <p>aaaaaa</p>
            <button onClick={onClose} className={styles.closeButton}>Close</button>
            <h2 className={styles.title}>{recipe.title}</h2>
            {recipe.image && <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />}
            <h3 className={styles.sectionTitle}>רכיבים:</h3>
            <ul className={styles.ingredientList}>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3 className={styles.sectionTitle}>הוראות הכנה:</h3>
            <ol className={styles.instructionList}>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};

export default PageSidebar;


// const PageSidebar = ({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void }) => {
//     if (!recipe) return null;

//     return (
//         <div className={`${styles.sidebar} ${recipe ? styles.sidebarOpen : ''}`}>
//             <button onClick={onClose} className={styles.closeButton}>Close</button>
//             <h2 className={styles.title}>{recipe.title}</h2>
//             {recipe.image && <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />}
//             <h3 className={styles.sectionTitle}>רכיבים:</h3>
//             <ul className={styles.ingredientList}>
//                 {recipe.ingredients.map((ingredient, index) => (
//                     <li key={index}>{ingredient}</li>
//                 ))}
//             </ul>
//             <h3 className={styles.sectionTitle}>הוראות הכנה:</h3>
//             <ol className={styles.instructionList}>
//                 {recipe.instructions.map((instruction, index) => (
//                     <li key={index}>{instruction}</li>
//                 ))}
//             </ol>
//         </div>
//     );
// };

// export default PageSidebar;
