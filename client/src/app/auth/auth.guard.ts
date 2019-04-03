import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { User } from '../model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  currentUser : User;
  constructor(
    private router : Router,
    private authenticationService : AuthenticationService
    //private state: 
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    //this.router.navigate(['/login']);
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
