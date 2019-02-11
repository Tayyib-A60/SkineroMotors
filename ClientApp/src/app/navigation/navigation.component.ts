import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { AuthGuardService } from '../services/authGuard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isExpanded = false;

  constructor(private authService: AuthService,
     private authGuardService: AuthGuardService,
    private router: Router, private route: ActivatedRoute) {
  }
  isAuthenticated(): boolean {
    return this.authGuardService.isAuthenticated();
  }

  ngOnInit() {
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
