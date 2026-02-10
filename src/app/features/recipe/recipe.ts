import { Component, signal, inject, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { FormsModule } from '@angular/forms';
import { Button } from '../../shared/components/button/button';
@Component({
  selector: 'app-recipe',
  imports: [FormsModule, Button],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  recipeService = inject(RecipeService);

  recipes = this.recipeService.recipes;

  recipeData: any = {};

  ngOnInit(): void {
    this.getRecipes();

  }

  getRecipes() {
    this.recipeService.getRecipes();
  }

  addRecipe() {
    this.recipeService.addRecipe(this.recipeData);
  }

  editRecipe(){

  }




}
