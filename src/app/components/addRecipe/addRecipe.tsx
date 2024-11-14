// AddRecipeForm.tsx
import React, { useState } from "react";
import { Recipe } from "../../../models/recipe";
import styles from "./addRecipe.module.css";

interface AddRecipeFormProps {
  onAddRecipe: (newRecipe: Recipe) => void;
  onClose: () => void;
  categories: string[];
}


const AddRecipeForm = ({ onAddRecipe, onClose, categories}: AddRecipeFormProps) => {

  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    title: "",
    catergory: "",
    instructions: [],
    ingredients: [],
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`); // Debugging line
    if(name=="category"){}
    if (name === "instructions" || name === "ingredients") {
      setNewRecipe({ ...newRecipe, [name]: value.split("\n") });
    } else {
      setNewRecipe({ ...newRecipe, [name]: value });
    }
    console.log(newRecipe.catergory); // Debugging line
  };

  const handleAdd = () => {
    onAddRecipe(newRecipe as Recipe);
    setNewRecipe({
      title: "",
      catergory: "",
      instructions: [],
      ingredients: [],
      image: "",
    });
    onClose();
  };

  return (
    <div className={`${styles.formContainer} ${styles.formOpen}`}>
      <button onClick={onClose} className={styles.closeButton}>
x      </button>
      <h2 className={styles.title}>Add New Recipe</h2>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={newRecipe.title || ""}
        onChange={handleChange}
        className={styles.inputField}
      />
<select
  name="category"
  value={newRecipe.catergory || ""}
  onChange={handleChange}
  className={styles.inputField} 
>
  <option value="" disabled>select category</option>
  {categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>

      <textarea
        name="instructions"
        placeholder="Instructions (one per line)"
        value={(newRecipe.instructions || []).join("\n")}
        onChange={handleChange}
        className={styles.textArea}
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients (one per line)"
        value={(newRecipe.ingredients || []).join("\n")}
        onChange={handleChange}
        className={styles.textArea}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newRecipe.image || ""}
        onChange={handleChange}
        className={styles.inputField}
      />
      <button onClick={handleAdd} className={styles.saveButton}>
        Save Recipe
      </button>
    </div>
  );
};

export default AddRecipeForm;
