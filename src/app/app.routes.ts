import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { adminGuard } from './guards/admin.guard';

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
];
