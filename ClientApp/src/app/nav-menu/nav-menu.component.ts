import { AuthGuardService } from './../services/authGuard.service';
import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private authService: AuthService,
     private authGuardService: AuthGuardService,
    private router: Router, private route: ActivatedRoute) {
  }
  isAuthenticated(): boolean {
    return this.authGuardService.isAuthenticated();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['../publicVehicle'], {relativeTo: this.route});
  }
}
