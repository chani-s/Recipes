import styles from './Header.module.css';
import AddRecipeForm from '../addRecipe/addRecipe';
import CategoryPicker from '../CategoryPicker/CategoryPicker';
import { IoHeart } from "react-icons/io5";
import Link from 'next/link';
import { Recipe } from '@/models/recipe';


interface HeaderProps {
    categories: string[];
    handleCategory: (category: string) => void;
    searchQuery: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpenForm: () => void;
    isFormOpen: boolean;
    handleAddRecipe: (newRecipe: Recipe) => void;
    handleCloseForm: () => void;
}

const Header = ({ categories, handleCategory, searchQuery, handleSearchChange, handleOpenForm, isFormOpen, handleAddRecipe, handleCloseForm }: HeaderProps) => {
    return (
        <div className={styles.sortBar}>
            <CategoryPicker categories={categories} onCategorySelect={handleCategory} />

            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchBar}
            />

            <button onClick={handleOpenForm} className={styles.addButton}>
                Add Recipe
            </button>

            <Link className="nav-link" href="/recipes/favorite"><IoHeart className={styles.heartIcon} /></Link>

            {isFormOpen && (
                <AddRecipeForm onAddRecipe={handleAddRecipe} onClose={handleCloseForm} categories={categories} />
            )}
        </div>
    );
}

export default Header;