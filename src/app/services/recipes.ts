import axios, { AxiosResponse } from 'axios';
import {http} from './http';
import {Recipe} from '../models/recipe';


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
