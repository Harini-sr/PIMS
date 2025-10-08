/* import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
  
};
 */

 
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
 
  constructor(private router: Router) {}
 
 
canActivate(route: ActivatedRouteSnapshot): boolean {
  const storedRole = localStorage.getItem('role');
  const expectedRole = route.data['role'];
 
  console.log('Guard check - stored:', storedRole, 'expected:', expectedRole);
 
  // If user is already on /login, do NOT redirect again
  if (!storedRole) {
    if (route.routeConfig?.path !== 'login') {
      this.router.navigate(['/login']);
    }
    return false;
  }
 
  if (storedRole === expectedRole) {
    return true;
  }
 
  this.router.navigate(['/login']);
  return false;
}
 
 
}
 