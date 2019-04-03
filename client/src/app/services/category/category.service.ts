import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import config from '../../config/api.json';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

  getAll(id, token) {
    return this.http.get<any>(`/category/getAll`, { headers: {'x-access-token': token}, params : {'userId' : id} })
    .pipe(map(response => {
      return response;
    }));
  }

  save(category, token) {
    return this.http.post<any>(`/category/create`, {'category' : category}, { headers: {'x-access-token': token}})
    .pipe(map(response => {
      return response;
    }))
  }
}
