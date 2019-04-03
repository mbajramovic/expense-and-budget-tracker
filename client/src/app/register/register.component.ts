import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UserService} from '../services';
import { first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import config from '../config/api.json';
import {User} from '../model/user';
import { AuthenticationService } from '../auth/authentication.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm : FormGroup;
  private submitted = false;
  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private alertService : AlertService
  ) { 

  }

  get con() { return this.registerForm.controls;}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      mail : ['', [Validators.required, Validators.email]],
      username : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        if (data.statusCode == 200) {
          this.alertService.success(data.message);
        }
        else 
          this.alertService.error(data.message);
      },
      error => {
        this.alertService.error(error);
      }
    );
   /* this.http.post<any>(`http://${config.api.url}$/auth/login`, {'user' : this.registerForm.value})
     .pipe(map(response => {
        console.log(response);
     }))*/
     //this.aut.login('a', 'b');
  }

}
