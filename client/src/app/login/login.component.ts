import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert/alert.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService : AuthenticationService,
    private router : Router,
    private alertService : AlertService
  ) { 

  }

  get con() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) 
      return;
    this.authenticationService.login(this.con.username.value, this.con.password.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        if (data.statusCode == 200) {
          this.router.navigate(['/']);
        }
        else {
          this.alertService.error(data.message);
        }
      },
      error => {

      }
    )
  }
}
