// page.tsx
"use client"
import recipeService from "../services/recipes";
import { Recipe } from "../models/recipe"
import { useEffect, useState } from "react";
import styles from './recipes.module.css'


function Page() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            setRecipes(recipesData);
            console.log("Fetched recipes:", recipesData); // Log the fetched data directly
        } catch (error: any) {
            console.log("Error fetching recipes:", error.message);
        }
    };


    useEffect(() => {
        getRecipes(); // Fetch recipes when the component mounts
    }, []);

    return (
        <div>
          <h1>Recipes</h1>
          {recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            <div className={styles.recipesGrid}>
              {recipes.map((recipe) => (
                <div
                  key={
                    recipe.id instanceof Object ? recipe.id.toString() : 'default-key'
                  }
                  className={styles.recipeContainer}
                >
                  <h2 className={styles.recipeTitle}>{recipe.title}</h2>
    
                  {/* Display Ingredients */}
                  <h3 className={styles.sectionTitle}>רכיבים:</h3>
                  <ul className={styles.ingredientList}>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
    
                  {/* Display Instructions */}
                  <h3 className={styles.sectionTitle}>הוראות הכנה:</h3>
                  <ol className={styles.instructionList}>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
    
                  {/* Display Image (if it exists) */}
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className={styles.recipeImage}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );

    // return (
    //     <div>
    //       <h1>Recipes</h1>
    //       {recipes.length === 0 ? (
    //         <p>No recipes found.</p>
    //       ) : (
    //         <ul>
    //           {recipes.map((recipe) => (
    //             <li
    //               key={
    //                 recipe.id instanceof Object ? recipe.id.toString() : 'default-key'
    //               }
    //               className={styles.recipeContainer}
    //             >
    //               <h2 className={styles.recipeTitle}>{recipe.title}</h2>
    
    //               {/* Display Ingredients */}
    //               <h3 className={styles.sectionTitle}>רכיבים:</h3>
    //               <ul className={styles.ingredientList}>
    //                 {recipe.ingredients.map((ingredient, index) => (
    //                   <li key={index}>{ingredient}</li>
    //                 ))}
    //               </ul>
    
    //               {/* Display Instructions */}
    //               <h3 className={styles.sectionTitle}>הוראות הכנה:</h3>
    //               <ol className={styles.instructionList}>
    //                 {recipe.instructions.map((instruction, index) => (
    //                   <li key={index}>{instruction}</li>
    //                 ))}
    //               </ol>
    
    //               {/* Display Image (if it exists) */}
    //               {recipe.image && (
    //                 <img
    //                   src={recipe.image}
    //                   alt={recipe.title}
    //                   className={styles.recipeImage}
    //                 />
    //               )}
    //             </li>
    //           ))}
    //         </ul>
    //       )}
    //     </div>
    //   );

}

export default Page;

