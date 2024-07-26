import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceSession } from '../service/session.service';

export const authGuardGuard: CanActivateFn = () => {
  const authService = inject(ServiceSession);
  const router = inject(Router);

  if (authService.tokenExpired) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
