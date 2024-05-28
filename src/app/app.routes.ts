import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent, title: 'Bienvenida' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
    title: 'Iniciar sesión',
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/createComponent/create/create.component').then(
        (c) => c.CreateComponent
      ),
    title: 'Alta Repartidor',
    canMatch: [authGuard],
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./components/detailComponent/detail/detail.component').then(
        (c) => c.DetailComponent
      ),
    title: 'Detalle Repartidor',
    canMatch: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/error/error.component').then(
        (c) => c.ErrorComponent
      ),
  },
];
