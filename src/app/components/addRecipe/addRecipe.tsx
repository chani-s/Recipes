import React, { useState } from "react";
import { Recipe } from "../../../models/recipe";
import styles from "./addRecipe.module.css";

interface AddRecipeFormProps {
  onAddRecipe: (newRecipe: Recipe) => void;
  onClose: () => void;
  categories: string[];
}

const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Hla2gHM_leGKbs1-g_rmhJpeUskDp3z4PQ&s";


const AddRecipeForm = ({ onAddRecipe, onClose, categories }: AddRecipeFormProps) => {
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    title: "",
    category: "",
    instructions: [],
    ingredients: [],
    image: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "instructions" || name === "ingredients") {
      setNewRecipe({ ...newRecipe, [name]: value.split("\n") });
    } else {
      setNewRecipe({ ...newRecipe, [name]: value });
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newRecipe.title) newErrors.title = "Title is required.";
    if (!newRecipe.category) newErrors.category = "Category is required.";
    if (!newRecipe.instructions || newRecipe.instructions.length === 0) {
      newErrors.instructions = "At least one instruction is required.";
    }
    if (!newRecipe.ingredients || newRecipe.ingredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validateForm()) return;

    if (!newRecipe.image) {
      newRecipe.image = defaultImageUrl;
    }

    onAddRecipe(newRecipe as Recipe);
    setNewRecipe({
      title: "",
      category: "",
      instructions: [],
      ingredients: [],
      image: "",
    });
    onClose();
  };
return (
    <div className={`${styles.formContainer} ${styles.formOpen}`}>
      <button onClick={onClose} className={styles.closeButton}>
        x
      </button>
      <h2 className={styles.title}>Add New Recipe</h2>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={newRecipe.title || ""}
        onChange={handleChange}
        className={`${styles.inputField} ${errors.title ? styles.errorField : ""}`}
      />
      {errors.title && <p className={styles.errorText}>{errors.title}</p>}

      <select
        name="category"
        value={newRecipe.category || ""}
        onChange={handleChange}
        className={`${styles.inputField} ${errors.category ? styles.errorField : ""}`}
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {errors.category && <p className={styles.errorText}>{errors.category}</p>}

      <textarea
        name="instructions"
        placeholder="Instructions (one per line)"
        value={(newRecipe.instructions || []).join("\n")}
        onChange={handleChange}
        className={`${styles.textArea} ${errors.instructions ? styles.errorField : ""}`}
      />
      {errors.instructions && <p className={styles.errorText}>{errors.instructions}</p>}

      <textarea
        name="ingredients"
        placeholder="Ingredients (one per line)"
        value={(newRecipe.ingredients || []).join("\n")}
        onChange={handleChange}
        className={`${styles.textArea} ${errors.ingredients ? styles.errorField : ""}`}
      />
      {errors.ingredients && <p className={styles.errorText}>{errors.ingredients}</p>}

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newRecipe.image || ""}
        onChange={handleChange}
        className={`${styles.inputField} ${errors.image ? styles.errorField : ""}`}
      />
      {errors.image && <p className={styles.errorText}>{errors.image}</p>}

      <button onClick={handleAdd} className={styles.saveButton}>
        Save Recipe
      </button>
    </div>
  );
};

export default AddRecipeForm;
