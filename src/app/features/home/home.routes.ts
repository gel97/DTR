import { Routes } from '@angular/router';
import { Home } from './home';
import { Sample } from './components/sample/sample';

export const home_routes: Routes = [
    {
        path: 'home',
        component: Home,
    },
    {
       path:'home/sample',
       component: Sample
    }
];
