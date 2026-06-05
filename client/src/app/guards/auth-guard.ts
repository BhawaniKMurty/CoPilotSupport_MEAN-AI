import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // allowed through, or redirected to /login if not logged in
  return auth.isLoggedIn()? true:router.parseUrl('/login');
};
