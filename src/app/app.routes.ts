import { Routes } from '@angular/router';
import { authGuardGuard } from './lib/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tacama',
    loadComponent: () => import('./tacama/tacama.component'),
    children: [
      {
        path: 'home',
        title: 'Inicio',
        loadComponent: () => import('./tacama/pages/home/home.component'),
        canActivate: [authGuardGuard],
      },
      {
        path: 'cliente',
        title: 'Clientes',
        loadComponent: () => import('./tacama/pages/cliente/cliente.component'),
        canActivate: [authGuardGuard],
      },
      {
        path: 'pedido',
        title: 'Pedidos',
        loadComponent: () => import('./tacama/pages/pedido/pedido.component'),
        canActivate: [authGuardGuard],
      },
      {
        path: 'pedido/register/:id',
        title: 'Editar pedidos',
        loadComponent: () =>
          import('./tacama/pages/pedido/register/register.component'),
        canActivate: [authGuardGuard],
      },
    ],
  },
  {
    path: 'login',
    title: 'Iniciar sesion',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
