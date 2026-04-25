import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if(auth.isLoggedIn())
    return true;

  const queryParams = {returnUrl: state.url};
  router.navigate(["/login"], { queryParams });
  
  return false;
};
