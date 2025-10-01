import { CanActivateFn, Router } from '@angular/router';
import { FlightService } from './flight.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const flightService = inject(FlightService);
  const router = inject(Router);

  if (localStorage.getItem('flight')) {
    return true;
  }

  return router.createUrlTree(['/']);
};
