import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { Router } from '@angular/router';

import {User} from './model/user';
import { AuthenticationService } from './auth/authentication.service';
import { AlertComponent } from './alert';
import { AlertService } from './services/alert/alert.service';
//import {AuthenticationService} from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 currentUser : User;
 constructor(
  private router: Router,
  private authenticationService: AuthenticationService
) {
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}
  
}
