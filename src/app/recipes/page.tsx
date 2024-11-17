"use client";
import { useEffect, useState } from "react";
import recipeService from "../services/recipes";
import { Recipe } from "../../models/recipe";
import styles from "./recipes.module.css";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { getFromStorage, saveToStorage } from '../services/localStorage';
import { ObjectId } from "mongodb";
import { useObjectIdStore } from '../services/zustand';
import Link from 'next/link';
import Header from "../components/Header/Header";



const Page = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const categories = ["מנות עיקריות", "עוגיות", "תוספות", "עוגות"];
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 8;
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


    const setObjectIds = useObjectIdStore((state) => state.setObjectIds);

    const getRecipes = async () => {
        try {
            const recipesData = await recipeService.getAllRecipes();
            saveToStorage("recipes", recipesData);

            const favoriteRecipes = getFromStorage<ObjectId>("favorite");

            if (favoriteRecipes)
                setObjectIds(favoriteRecipes);
            else
                setObjectIds([]);

            setRecipes(recipesData);
            setFilteredRecipes(recipesData);

            console.log("Fetched recipes:", recipesData);
        } catch (error: any) {
            console.log("Error fetching recipes:", error.message);
        } finally {
            setLoading(false);

        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    // Create an array of page numbers
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


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
            <div>
                <Header categories={categories}
                    handleCategory={handleCategorySelect}
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleOpenForm={handleOpenForm}
                    isFormOpen={isFormOpen}
                    handleAddRecipe={handleAddRecipe}
                    handleCloseForm={handleCloseForm}
                />
            </div>

            {loading ? (
                <p>LOADING...</p>
            ) : (
                <div className={styles.recipesGrid}>
                    {currentRecipes.length > 0 ? (
                        currentRecipes.map((recipe, index) => (
                            <RecipeCard recipe={recipe} index={index} key={index} />
                        ))
                    ) : (
                        <p>No recipes found</p>
                    )}
                </div>
            )}

            <div className={styles.pagination}>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={number === currentPage ? styles.activePage : ""}
                    >
                        {number}
                    </button>
                ))}
            </div>


        </div>

    );
};

export default Page;

