import axios, { AxiosResponse } from 'axios';
import {http} from './http';

interface Recipe {
    id: number;
    title: string;
    description: string;
    // Add other fields according to the API response structure
}

const recipeService = {
    async getAllRecipes(): Promise<Recipe[]> {
        try {
            const response: AxiosResponse<Recipe[]> = await http.get('/recipes');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default recipeService;
