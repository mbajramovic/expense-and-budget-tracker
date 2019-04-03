import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private currentUser : User;

  
  constructor(
    private authenticationService : AuthenticationService,
    private router : Router
  ) { 

    this.authenticationService.currentUser.subscribe(user => { this.currentUser = user});
  }

  ngOnInit() {
    this.router.navigate(['/expenses']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
