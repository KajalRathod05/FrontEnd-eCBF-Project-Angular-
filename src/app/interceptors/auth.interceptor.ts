import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const toastr = inject(ToastrService);

  let authRequest = req;

  // Add JWT if token exists
  if (token) {

    authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    //console.log('Sending Authorization:', `Bearer ${token}`);
  }

  return next(authRequest).pipe(

    catchError((error: HttpErrorResponse) => {

      console.log('Interceptor error status:',error.status);

      // JWT expired / invalid / unauthorized
      if (error.status === 401) {

        console.log('JWT expired or unauthorized.');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userid');
        dialog.closeAll();

        // Redirect to login
        if (!router.url.startsWith('/login')) {
          toastr.error('JWT expired or unauthorized.', 'Error');
          console.log('Redirecting to login page...');
          router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    })
  );
};
function constructor() {
  throw new Error('Function not implemented.');
}

