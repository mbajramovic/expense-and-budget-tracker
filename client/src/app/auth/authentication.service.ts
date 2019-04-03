import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import config from '../config/api.json';

import {User} from '../model';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject : BehaviorSubject<User>;
  currentUser : Observable<User>;
  constructor(private http : HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();

   }

   public get currentUserValue() : User {
     return this.currentUserSubject.value;
   }

   login(username: string, password: string)  {
    return this.http.post<any>(`/auth/login`, { username, password })
    .pipe(map(response => {
      console.log(response);
      if (response.statusCode == 200) {
        var user = response.data;
        if (user && response.token) {
          user.token = response.token;
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      }
      return response;
    }));
   }

   logout() {
     localStorage.removeItem('user');
     this.currentUserSubject.next(null);
   }


}
