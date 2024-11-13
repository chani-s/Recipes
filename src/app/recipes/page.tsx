"use client"
import recipeService from "../services/recipes";
import PageSidebar from "../showRecipe/page";
import { useEffect, useState } from "react";
import styles from './recipes.module.css'
import { useObjectIdStore } from "../services/zustand";
import { Recipe } from "@/models/recipe";
import { getFromStorage, saveToStorage } from "../services/localStorage";
import { ObjectId } from "mongodb";

const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
    const [loading, setLoading] = useState(true); // New loading state




const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const setObjectIds = useObjectIdStore((state) => state.setObjectIds);

    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            setRecipes(recipesData);
            console.log("Fetched recipes:", recipesData);
            console.log("Fetched recipes:", recipesData); // Log the fetched data directly
            saveToStorage("recipes", recipesData);
            setRecipes(recipesData);

            const favoriteRecipes = getFromStorage<ObjectId>("favorite");
            
            if (favoriteRecipes)
                setObjectIds(favoriteRecipes);
            else
                setObjectIds([]);

            console.log("Fetched recipes:", recipesData);
        } catch (error: any) {
            console.log("Error fetching recipes:", error.message);
        }
        finally {
            setLoading(false); // Set loading to false once data is fetched or an error occurs
            setLoading(false);
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);


  const openSidebar = (recipe: Recipe) => {
    console.log("in click");
    setSelectedRecipe(recipe);
  };


    const closeSidebar = () => {
        setSelectedRecipe(undefined);
    };



    useEffect(() => {
        getRecipes(); // Fetch recipes when the component mounts
    }, []);

    
  // return (
  //   <div className={styles.pageContainer}>
  //     <div className={styles.recipesGrid}>
  //       {recipes.map((recipe) => (
  //         <div
  //           key={recipe.id instanceof Object ? recipe.id.toString() : 'default-key'}
  //           className={styles.recipeContainer}
  //           onClick={() => openSidebar(recipe)}
  //         >
  //           <h2 className={styles.recipeTitle}>{recipe.title}</h2>
  //           {recipe.image && (
  //             <img
  //               src={recipe.image}
  //               alt={recipe.title}
  //               className={styles.recipeImage}
  //             />
  //           )}
  //         </div>
  //       ))}
  //     </div>

  //     {selectedRecipe && (
  //       <div className={styles.sidebar}>
  //         <PageSidebar recipe={selectedRecipe} onClose={closeSidebar} />
  //       </div>
  //     );
  //   };

    
// export default Page;

      //     <h1>Recipes</h1>
      //     {recipes.length === 0 ? (
      //       <p>No recipes found.</p>
      //     ) : (
      //       <div className={styles.recipesGrid}>
      //         {recipes.map((recipe) => (
      //           <div
      //             key={
      //               recipe.id instanceof Object ? recipe.id.toString() : 'default-key'
      //             }
      //             className={styles.recipeContainer}
      //           >
      //             <h2 className={styles.recipeTitle}>{recipe.title}</h2>
    
      //             {/* Display Ingredients */}
      //             <h3 className={styles.sectionTitle}>רכיבים:</h3>
      //             <ul className={styles.ingredientList}>
      //               {recipe.ingredients.map((ingredient, index) => (
      //                 <li key={index}>{ingredient}</li>
      //               ))}
      //             </ul>
    
      //             {/* Display Instructions */}
      //             <h3 className={styles.sectionTitle}>הוראות הכנה:</h3>
      //             <ol className={styles.instructionList}>
      //               {recipe.instructions.map((instruction, index) => (
      //                 <li key={index}>{instruction}</li>
      //               ))}
      //             </ol>
    
      //             {/* Display Image (if it exists) */}
      //             {recipe.image && (
      //               <img
      //                 src={recipe.image}
      //                 alt={recipe.title}
      //                 className={styles.recipeImage}
      //               />
      //             )}
      //           </div>
      //         ))}
      //       </div>
      //     )}
      //   </div>
      // );

//     return (
//         <div>
//           <h1>Recipes</h1>
//           {recipes.length === 0 ? (
//             <p>No recipes found.</p>
//           ) : (
//             <ul>
//               {recipes.map((recipe) => (
//                 <li
//                   key={
//                     recipe.id instanceof Object ? recipe.id.toString() : 'default-key'
//                   }
//                   className={styles.recipeContainer}
//                 >
//                   <h2 className={styles.recipeTitle}>{recipe.title}</h2>
    
//                   {/* Display Ingredients */}
//                   <h3 className={styles.sectionTitle}>רכיבים:</h3>
//                   <ul className={styles.ingredientList}>
//                     {recipe.ingredients.map((ingredient, index) => (
//                       <li key={index}>{ingredient}</li>
//                     ))}
//                   </ul>
    
//                   {/* Display Instructions */}
//                   <h3 className={styles.sectionTitle}>הוראות הכנה:</h3>
//                   <ol className={styles.instructionList}>
//                     {recipe.instructions.map((instruction, index) => (
//                       <li key={index}>{instruction}</li>
//                     ))}
//                   </ol>
    
//                   {/* Display Image (if it exists) */}
//                   {recipe.image && (
//                     <img
//                       src={recipe.image}
//                       alt={recipe.title}
//                       className={styles.recipeImage}
//                     />
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       );

// }

export default Page;


//     return (
//         <div>
//             <div className={styles.pageContainer}>
//                 {loading ? (
//                     <p>LOADING...</p>
//                 ) : (
//                     <div className={styles.recipesGrid}>
//                         {recipes.map((recipe, index) => (
//                             <RecipeCard recipe={recipe} index={index} />
//                         ))}
//                     </div>

//                 )}

//             </div>
//         </div>

//     );
// };
// export default Page;



