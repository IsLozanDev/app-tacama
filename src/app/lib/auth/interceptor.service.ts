import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ServiceSession } from '../service/session.service';

export const InterceptorService: HttpInterceptorFn = (req, next) => {
  const authService = inject(ServiceSession);
  const authToken = authService.token;

  if (!req.url.includes('login')) {
    const cloned = req.clone({
      setHeaders: {
        'content-type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      // setHeaders: {
      //   'content-type': 'application/json',
      //   authorization: '',
      // },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
