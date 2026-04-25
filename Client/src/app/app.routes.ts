import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = 
[
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'users',
        loadChildren: () => import('./features/users/routes').then(r=>r.routes),
        canActivate: [authGuard]
    },
    {
        path: 'tasks',
        loadChildren: () => import('./features/tasks/routes').then(r=>r.routes),
        canActivate: [authGuard]
    },
    {
        path: 'errors',
        loadChildren: () => import('./features/errors/routes').then(r=>r.routes)
    },
    {
        path: '**',
        redirectTo: 'errors/404',
    }
];
