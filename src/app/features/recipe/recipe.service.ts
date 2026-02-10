import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  recipes = signal<any>({
    data: [],
    isLoading: false,
  });

  getRecipes() {
    this.recipes.update((prev: any) => ({
      ...prev,
      isLoading: true,
    }));
    this.http.get('https://dummyjson.com/recipes').subscribe({
      next: (response: any) => {
        this.recipes.update((prev: any) => ({
          ...prev,
          data: response.recipes,
        }));
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
      complete: () => {
        this.recipes.update((prev: any) => ({
          ...prev,
          isLoading: false,
        }));
      },
    });
  }

  addRecipe(recipe: any) {
    this.http.post('https://dummyjson.com/recipes/add', recipe).subscribe({
      next: (response) => {
        console.log('Recipe added successfully:', response);
        this.getRecipes(); // Refresh the recipe list after adding a new recipe
      },
      error: (error) => {
        console.error('Error adding recipe:', error);
      },
    });
  }

  updateRecipe(id: number, updatedRecipe: any) {
    this.http.put(`https://dummyjson.com/recipes/${id}`, updatedRecipe).subscribe({
      next: (response) => {
        console.log('Recipe updated successfully:', response);
        this.getRecipes(); // Refresh the recipe list after updating a recipe
      },
      error: (error) => {
        console.error('Error updating recipe:', error);
      },
    });
  }

  deleteRecipe(id: number) {
    this.http.delete(`https://dummyjson.com/recipes/${id}`).subscribe({
      next: (response) => {
        console.log('Recipe deleted successfully:', response);
        this.getRecipes(); // Refresh the recipe list after deleting a recipe
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
      },
    });
  }
}
