import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { Permissions } from '../enums/permissions';

export const permissionGuard: CanActivateFn = (route, state) => {
 
  const auth = inject(Auth);
  const router = inject(Router);

  var permissions = route.data?.['permissions'] as Permissions[];
  if(!permissions || !auth.isLoggedIn()) 
    return false;

  if(!permissions.every(p => auth.session()!.permissions.includes(p))) {
    router.navigateByUrl('/errors/403');
    return false;
  }

   return true;
};
