import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  if(!auth.isLoggedIn()) 
    return next(req);

    const newReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + auth.session()!.token
      }
    });

    return next(newReq);
};
