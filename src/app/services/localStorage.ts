import { Recipe } from "../../models/recipe";

export function saveToStorage(name:string,element:Recipe[]){
    localStorage.setItem(name, JSON.stringify(element));
}

export function getFromStorage(name:string){
    const item = localStorage.getItem(name);
    return item !== null ? JSON.parse(item) : null;
}