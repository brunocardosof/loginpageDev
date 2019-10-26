import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


/* import Swal from 'sweetalert2'; */

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) { }

  canActivate() {
   /*  const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    if (currentUser) {
      this.router.navigate(['/principal']);
    } else {
      this.router.navigate(['/authentication']);
    } */
}
}
