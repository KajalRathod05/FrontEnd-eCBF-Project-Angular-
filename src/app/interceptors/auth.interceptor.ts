import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

   const token = sessionStorage.getItem('token');
  const router = inject(Router);

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

        // Redirect to login
        if (!router.url.startsWith('/login')) {
          console.log('Redirecting to login page...');
          router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    })
  );
};
