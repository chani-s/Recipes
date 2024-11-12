// AddRecipeForm.tsx
import React, { useState } from 'react';
import { RecipeToAdd } from '../models/RecipeToAdd';
import styles from './addRecipe.module.css';  // Corrected file name

interface AddRecipeFormProps {
  onClose: () => void;
  onAddRecipe: (newRecipe: RecipeToAdd) => void;  // Callback to add the recipe to the list
}

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ onClose, onAddRecipe }) => {
  const [newRecipe, setNewRecipe] = useState<RecipeToAdd>({
    title: '',
    category: '',
    instructions: [],
    ingredients: [],
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe((prevState) => ({
      ...prevState,
      [name]: value.split(',').map((item) => item.trim()),  // Split ingredients/instructions by commas
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const savedRecipe = await response.json();
        console.log('Recipe saved:', savedRecipe);

        // Call parent function to add recipe to list
        onAddRecipe(savedRecipe);

        // Reset form after saving
        setNewRecipe({
          title: '',
          category: '',
          instructions: [],
          ingredients: [],
          image: '',
        });

        onClose();  // Close form (modal or page)
      } else {
        console.error('Failed to save recipe');
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={newRecipe.category}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Ingredients (comma separated):</label>
        <textarea
          name="ingredients"
          value={newRecipe.ingredients.join(', ')}
          onChange={handleTextAreaChange}
          required
        />
      </div>
      <div>
        <label>Instructions (comma separated):</label>
        <textarea
          name="instructions"
          value={newRecipe.instructions.join(', ')}
          onChange={handleTextAreaChange}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={newRecipe.image}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Recipe</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AddRecipeForm;
