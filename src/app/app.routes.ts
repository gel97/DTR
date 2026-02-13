import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './features/home/home';
import { home_routes } from './features/home/home.routes';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { contact_routes } from './features/contact/contact.routes';
import { recipe_routes } from './features/recipe/recipe.routes';
import { user_routes } from './features/user/user.routes';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout
  },
  {
    path: '',
    component: MainLayout,
    children: [
      ...home_routes,
      ...contact_routes,
      ...recipe_routes,
      ...user_routes
    ]
  }
];
