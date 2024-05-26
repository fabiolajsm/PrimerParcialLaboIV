import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseAuth = inject(AuthService);
  const router = inject(Router);

  const isLogged = firebaseAuth.isAuthenticated();
  if (!isLogged) {
    router.navigateByUrl('');
  }
  return isLogged;
};
