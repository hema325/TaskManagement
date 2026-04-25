import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { Auth } from '../services/auth';
import { ActivatedRoute, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const auth = inject(Auth);
  const router = inject(Router);
  
  return next(req)
  .pipe(
    catchError(err => {
      if(err.status == 401) {

        if(auth.isLoggedIn()) {
          toastr.error('Your session has been expired');
          auth.logout();
        }

        const queryParams = { returnUrl: router.url };
        router.navigate(['/login'], { queryParams });
      }
      else if(err.status == 403) {
        router.navigateByUrl("/errors/403");
      }
      else if(err.status == 404) {
        router.navigateByUrl("/errors/404");
      }
      else {
        toastr.error(err.error.message ?? "Something went wrong!");
      }

      return throwError(() => err);
  }));
};
