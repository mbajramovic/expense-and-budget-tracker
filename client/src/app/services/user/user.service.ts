import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model';
import config from '../../config/api.json';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  register (user : User) {
    console.log(user);
    return this.http.post<any>(`/auth/register`, { 'user' : user })
    .pipe(map(response => {return response;}))  
  }
}
