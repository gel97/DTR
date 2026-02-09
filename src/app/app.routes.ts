import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './features/home/home';
import { home_routes } from './features/home/home.routes';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      ...home_routes
    ]
  }
];
