// "use client";
// import { useEffect, useState } from "react";
// import recipeService from "../services/recipes";
// import { Recipe } from "../../models/recipe";
// import styles from "./recipes.module.css";
// import RecipeCard from "../components/RecipeCard/RecipeCard";
// import CategoryPicker from "../components/CategoryPicker/CategoryPicker";

// import AddRecipeForm from "../components/addRecipe/addRecipe";

// const Page = () => {
//     const [recipes, setRecipes] = useState<Recipe[]>([]);
//     const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedCategory, setSelectedCategory] = useState<string>("");

//     const categories = ["מנות עיקריות", "עוגיות", "תוספות"];


//     const [isFormOpen, setIsFormOpen] = useState(false);

//     const getRecipes = async () => {
//         try {
//             const recipesData = await recipeService.getAllRecipes();
//             setRecipes(recipesData);
//             setFilteredRecipes(recipesData);
//             console.log("Fetched recipes:", recipesData);
//         } catch (error: any) {
//             console.log("Error fetching recipes:", error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCategorySelect = (category: string) => {
//         setSelectedCategory(category);
//         if (category === "") {
//             setFilteredRecipes(recipes);
//         } else {
//             const filtered = recipes.filter(recipe => recipe.catergory === category);
//             setFilteredRecipes(filtered);
//         }
//     };


//     useEffect(() => {
//         getRecipes();
//     }, []);

//     const handleOpenForm = () => setIsFormOpen(true);
//     const handleCloseForm = () => setIsFormOpen(false);

//     const handleAddRecipe = async (newRecipe: Recipe) => {
//         const nesDoc = await recipeService.addRecipe(newRecipe);
//         const recipesData = await recipeService.getAllRecipes();
//         console.log("New Recipe added:", nesDoc);
//         console.log(recipesData)
//         setRecipes(recipesData);
//         handleCloseForm();
//     };

//     return (
//         <div className={styles.pageContainer}>
//             <div className={styles.sortBar}>
//                 <CategoryPicker categories={categories} onCategorySelect={handleCategorySelect} />

//                 //here add search field 

//                 <button
//                     onClick={handleOpenForm}
//                     className={styles.addButton}>
//                     הוספת מתכון </button>
//                 {isFormOpen && (
//                     <AddRecipeForm
//                         onAddRecipe={handleAddRecipe}
//                         onClose={handleCloseForm}
//                     />
//                 )} 

//             </div>
//             {loading ? (
//                 <p>LOADING...</p>
//             ) : (
//                 <div className={styles.recipesGrid}>
//                     {filteredRecipes.length > 0 ? (
//                         filteredRecipes.map((recipe, index) => (
//                             <RecipeCard recipe={recipe} index={index} key={index} />
//                         ))
//                     ) : (
//                         <p>No recipes found for this category.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Page;

"use client";
import { useEffect, useState } from "react";
import recipeService from "../services/recipes";
import { Recipe } from "../../models/recipe";
import styles from "./recipes.module.css";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import CategoryPicker from "../components/CategoryPicker/CategoryPicker";
import AddRecipeForm from "../components/addRecipe/addRecipe";

const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query

    const categories = ["מנות עיקריות", "עוגיות", "תוספות"];
    const [isFormOpen, setIsFormOpen] = useState(false);

    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            setRecipes(recipesData);
            setFilteredRecipes(recipesData);
            console.log("Fetched recipes:", recipesData);
        } catch (error: any) {
            console.log("Error fetching recipes:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        filterRecipes(searchQuery, category);
    };

    const filterRecipes = (query: string, category: string) => {
        let filtered = recipes;

        if (category) {
            filtered = filtered.filter(recipe => recipe.catergory === category);
        }

        if (query) {
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        setFilteredRecipes(filtered);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterRecipes(query, selectedCategory);
    };

    useEffect(() => {
        getRecipes();
    }, []);

    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => setIsFormOpen(false);

    const handleAddRecipe = async (newRecipe: Recipe) => {
        const newDoc = await recipeService.addRecipe(newRecipe);
        const recipesData = await recipeService.getAllRecipes();
        console.log("New Recipe added:", newDoc);
        console.log(recipesData);
        setRecipes(recipesData);
        handleCloseForm();
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.sortBar}>
                <CategoryPicker categories={categories} onCategorySelect={handleCategorySelect} />

                <input
                    type="text"
                    placeholder="חפש מתכון"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchBar}
                />

                <button onClick={handleOpenForm} className={styles.addButton}>
                    הוספת מתכון
                </button>
                {isFormOpen && (
                    <AddRecipeForm onAddRecipe={handleAddRecipe} onClose={handleCloseForm} />
                )}
            </div>

            {loading ? (
                <p>LOADING...</p>
            ) : (
                <div className={styles.recipesGrid}>
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe, index) => (
                            <RecipeCard recipe={recipe} index={index} key={index} />
                        ))
                    ) : (
                        <p>No recipes found for this category.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Page;

