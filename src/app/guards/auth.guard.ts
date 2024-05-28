import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route, state) => {
  const firebaseAuth = inject(AuthService);
  const router = inject(Router);

  const isLogged = firebaseAuth.isAuthenticated();
  if (!isLogged) {
    alert('Tiene que estar logueado para entrar en esta pagina');
    router.navigateByUrl('login');
  }
  return isLogged;
};
