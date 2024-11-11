// page.tsx
"use client"
import recipeService from "../services/recipes";
<<<<<<< HEAD
import { Recipe } from "../models/recipe";
import { useEffect, useState } from "react";
import styles from './recipes.module.css';
import PageSidebar from "../showRecipe/page";
=======
import { Recipe } from "../models/recipe"
import { useEffect, useState } from "react";
import styles from './recipes.module.css'

>>>>>>> e502f41 (add recipes cards)

const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
    const [loading, setLoading] = useState(true); // New loading state

    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            setRecipes(recipesData);
<<<<<<< HEAD
            console.log("Fetched recipes:", recipesData);
=======
            console.log("Fetched recipes:", recipesData); // Log the fetched data directly
>>>>>>> e502f41 (add recipes cards)
        } catch (error: any) {
            console.log("Error fetching recipes:", error.message);
        }
        finally {
            setLoading(false); // Set loading to false once data is fetched or an error occurs
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 89a3164 (add loading)
    const openSidebar = (recipe: Recipe) => {
        console.log("in click");
        setSelectedRecipe(recipe);
    };
<<<<<<< HEAD
=======
  const openSidebar = (recipe: Recipe) => {
    console.log("in click");
    setSelectedRecipe(recipe);
  };
>>>>>>> c0b6b7f (set recipes grid style)
=======
>>>>>>> 89a3164 (add loading)

    const closeSidebar = () => {
        setSelectedRecipe(undefined);
    };

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 89a3164 (add loading)
=======

    useEffect(() => {
        getRecipes(); // Fetch recipes when the component mounts
    }, []);

>>>>>>> b16d9e0 (add recipes cards)
    return (
        <div>
<<<<<<< HEAD
            <h1>My Recipes</h1>
            <button onClick={getRecipe}>Get Recipes</button>
            {recipes.map(recipe => (
                <div key={recipe.id.toString()}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.ingredients}</p>
                </div>
<<<<<<< HEAD
              ))}
            </div>
          )}
    
          {selectedRecipe && (
            <div className={styles.sidebar}>
              <PageSidebar recipe={selectedRecipe} onClose={closeSidebar} />
            </div>
          )}
<<<<<<< HEAD
=======
            ))}
>>>>>>> 502aa9a (layout works)
        </div>
      );
    };

    
=======
  return (
    <div className={styles.pageContainer}>
      <div className={styles.recipesGrid}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id instanceof Object ? recipe.id.toString() : 'default-key'}
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
        ))}
      </div>

      {selectedRecipe && (
        <div className={styles.sidebar}>
          <PageSidebar recipe={selectedRecipe} onClose={closeSidebar} />
=======
>>>>>>> 89a3164 (add loading)
        </div>
      );
    };

<<<<<<< HEAD
>>>>>>> c0b6b7f (set recipes grid style)
=======
    
>>>>>>> 89a3164 (add loading)
export default Page;
=======
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

>>>>>>> e502f41 (add recipes cards)
