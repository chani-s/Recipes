import { http } from './http';
import { Recipe } from '../../models/recipe';
import axios, { AxiosResponse } from 'axios';

const recipeService = {
  // Method to get all recipes
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const response: AxiosResponse<Recipe[]> = await http.get('/recipes');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Method to add a new recipe
  async addRecipe(newRecipe: Recipe): Promise<Recipe> {
    try {
      const response: AxiosResponse<Recipe> = await http.post('/recipes', newRecipe);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default recipeService;


