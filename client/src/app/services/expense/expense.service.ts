import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import config from '../../config/api.json';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  constructor(
    private http : HttpClient
  ) { 

  }

  getAll(id, token) {
    return this.http.get<any>(`/expense/getAll`, { headers: {'x-access-token': token}, params : {'userId' : id} })
    .pipe(map(response => {
      return response;
    }));
  }

  getExpense(userId, id, token) {
    return this.http.get<any>(`/expense/get`, { headers: {'x-access-token': token}, params : {'userId' : userId, 'id' : id} })
    .pipe(map(response => {
      return response;
    }));
  }

  save(expense, token) {
    return this.http.post<any>(`/expense/create`, {'expense' : expense}, { headers : {'x-access-token' : token}})
    .pipe(map(response => {
      return response;
    }));
  }

  update(expense, token) {
    return this.http.put<any>(`/expense/update`, {'expense' : expense}, { headers : {'x-access-token' : token}})
    .pipe(map(response => {
      return response;
    }));
  }

  deleteExpense(userId, id, token) {
    return this.http.delete<any>(`/expense/delete`, { headers: {'x-access-token': token}, params : {'userId' : userId, 'id' : id} })
    .pipe(map(response => {
      return response;
    }));
  }

  updateNote(note, userId, id, token) {
    return this.http.put<any>(`/expense/updateNote`, {'userId' : userId, 'expenseId' : id, 'note' : note}, { headers : {'x-access-token' : token}})
    .pipe(map(response => {
      return response;
    }));
  }
  
}
