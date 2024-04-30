import { Routes } from '@angular/router';

import { ensureAuthentication } from '@guards/ensure-authentication.guard';
import { ensureUnauthenticated } from '@guards/ensure-unauthenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: () => import('./unauthenticated.routes').then(m => m.UnauthenticatedRoutingModule),
    canActivateChild: [ensureUnauthenticated()]
  },

  {
    path: '',
    loadChildren: () => import('./authenticated.routes').then(m => m.AuthenticatedRoutingModule),
    canActivateChild: [ensureAuthentication()]
  },

  {
    path: '**',
    title: 'Página não encontrada | $NOME_SEU_SITE_TITLE',
    loadComponent: () => import('../pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
